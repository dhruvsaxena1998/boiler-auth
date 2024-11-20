import dayjs from "dayjs";
import { desc, eq } from "drizzle-orm";
import { err, ok } from "neverthrow";

import { database } from "@/database/drizzle";
import {
  type InsertSessionsSchema,
  sessionsTable,
} from "@/database/schema/sessions.sql";
import { usersTable } from "@/database/schema/users.sql";
import ENV from "@/env";
import {
  INTERNAL_SERVER_ERROR,
  OK,
  UNAUTHORIZED,
} from "@/lib/constants/http-status-codes";

import type { GenerateSessionDTO, ValidateSessionDTO } from "./session.dto";

import { generateToken, generateTokenHash } from "./session.helpers";

export async function GenerateSession(dto: GenerateSessionDTO) {
  try {
    const token = generateToken();
    const hashed_token = generateTokenHash(token);

    const expiresAt = dayjs()
      .add(ENV.SESSION_EXPIRY_MINUTES, "minutes")
      .toDate();

    const session: InsertSessionsSchema = {
      user_id: dto.user_id,
      hashed_token,
      expires: expiresAt,
    };

    const [result] = await database
      .insert(sessionsTable)
      .values(session)
      .$returningId();

    return ok({
      data: {
        id: result.id,
        token,
        user_id: dto.user_id,
        expires: expiresAt,
      },
      code: OK,
    });
  } catch {
    return err({
      message: "Something went wrong!",
      code: INTERNAL_SERVER_ERROR,
    });
  }
}

export async function ValidateSession(dto: ValidateSessionDTO) {
  // Generate a hash of the provided token for secure comparison
  const hashed_token = generateTokenHash(dto.token);

  const sessions = await database
    .select({
      user: usersTable,
      session: sessionsTable,
    })
    .from(sessionsTable)
    .innerJoin(usersTable, eq(sessionsTable.user_id, usersTable.id))
    .where(eq(sessionsTable.hashed_token, hashed_token))
    .orderBy(desc(sessionsTable.created_at));

  // Return unauthorized error if no matching session is found
  if (sessions.length < 1) {
    return err({
      message: "Invalid token!",
      code: UNAUTHORIZED,
    });
  }

  // First (most recent) session
  const [{ session }] = sessions;

  // Check if the session has expired
  if (dayjs().isAfter(dayjs(session.expires))) {
    await database
      .delete(sessionsTable)
      .where(eq(sessionsTable.id, session.id));

    return err({
      message: "Session expired!",
      code: UNAUTHORIZED,
    });
  }

  // If session is still valid, extend its expiration
  if (dayjs().isBefore(dayjs(session.expires))) {
    session.expires = dayjs()
      .add(ENV.SESSION_EXPIRY_MINUTES, "minutes")
      .toDate();

    await database
      .update(sessionsTable)
      .set({
        expires: session.expires,
      })
      .where(eq(sessionsTable.id, session.id));

    return ok({
      session,
      code: OK,
    });
  }
}
