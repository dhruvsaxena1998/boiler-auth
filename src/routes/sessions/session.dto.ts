import { z } from "@hono/zod-openapi";
import dayjs from "dayjs";

import { selectSessionsSchema } from "@/database/schema/sessions.sql";

export const GenerateSessionSchema = z
  .object({
    user_id: z.coerce.number(),
  })
  .openapi({
    example: {
      user_id: 1,
    },
  });
export type GenerateSessionDTO = z.infer<typeof GenerateSessionSchema>;

export const SelectSessionSchema = selectSessionsSchema.openapi({
  example: {
    id: 1,
    user_id: 1,
    expires: dayjs().toDate(),
    hashed_token: "token",
  },
});

export const ValidateSessionSchema = z
  .object({
    token: z.string(),
  })
  .openapi({
    example: {
      token: "token",
    },
  });
export type ValidateSessionDTO = z.infer<typeof ValidateSessionSchema>;
