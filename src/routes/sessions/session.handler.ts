import type { InsertSessionsSchema } from "@/database/schema/sessions.sql";
import type { AppRouteHandler } from "@/lib/@types/app";

import { database } from "@/database/drizzle";
import { sessions } from "@/database/schema/sessions.sql";
import { OK } from "@/lib/constants/http-status-codes";

import type { CreateSessionRoute } from "./session.route";

import { generateSessionId, generateToken } from "./session.helpers";

export const CreateSessionHandler: AppRouteHandler<CreateSessionRoute> = async (
  ctx,
) => {
  const json = ctx.req.valid("json");

  const token = generateToken();
  const sessionId = generateSessionId(token);

  // eslint-disable-next-line no-magic-numbers
  const ThirtyDaysInMiliseconds = 1000 * 60 * 60 * 24 * 30;

  const expiresAt = new Date(Date.now() + ThirtyDaysInMiliseconds);
  const session: InsertSessionsSchema = {
    user_id: json.user_id,
    token: sessionId,
    expires: expiresAt,
  };

  const [result] = await database
    .insert(sessions)
    .values(session)
    .$returningId();

  return ctx.json(
    {
      success: true,
      data: {
        id: result.id,
        token: sessionId,
        user_id: json.user_id,
        expires: expiresAt,
      },
    },
    OK,
  );
};
