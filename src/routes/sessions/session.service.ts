import dayjs from "dayjs";
import { err, ok } from "neverthrow";

import { database } from "@/database/drizzle";
import {
  type InsertSessionsSchema,
  sessionsTable,
} from "@/database/schema/sessions.sql";
import ENV from "@/env";
import { INTERNAL_SERVER_ERROR, OK } from "@/lib/constants/http-status-codes";

import type { GenerateSessionDTO } from "./session.dto";

import {
  generateSessionId,
  generateToken,
} from "./session.helpers";

export async function GenerateSession(dto: GenerateSessionDTO) {
  try {
    const token = generateSessionId(generateToken());

    const expiresAt = dayjs()
      .add(ENV.SESSION_EXPIRY_MINUTES, "minutes")
      .toDate();

    const session: InsertSessionsSchema = {
      user_id: dto.user_id,
      token,
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
