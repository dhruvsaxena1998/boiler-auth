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
    token: "token",
  },
});

export const ValidateSessionSchema = z
  .object({
    authorization: z.string().startsWith("Bearer "),
  })
  .openapi({
    example: {
      authorization: "Bearer <token>",
    },
  });
export type ValidateSessionDTO = z.infer<typeof ValidateSessionSchema>;

export const ValidatedSessionSchema = z
  .object({
    message: z.string(),
    session: selectSessionsSchema.omit({
      token: true,
    }),
  })
  .openapi({
    example: {
      message: "Session validated successfully!",
      session: {
        id: 1,
        user_id: 1,
        expires: dayjs().toDate(),
      },
    },
  });
export type ValidatedSessionDTO = z.infer<typeof ValidatedSessionSchema>;

export const InvalidateSessionSchema = z
  .object({
    session_id: z.coerce.number(),
  })
  .openapi({
    example: {
      session_id: 1,
    },
  });
export type InvalidateSessionDTO = z.infer<typeof InvalidateSessionSchema>;
