import { createRoute, z } from "@hono/zod-openapi";

import { selectSessionsSchema } from "@/database/schema/sessions.sql";
import { OK, UNPROCESSABLE_ENTITY } from "@/lib/constants/http-status-codes";
import {
  createSuccessSchema,
  createValidationErrorSchema,
  jsonContent,
} from "@/lib/utils/openapi/helpers";

export const tags = ["Sessions"];

const CreateSessionRequestBody = z
  .object({
    user_id: z.coerce.number(),
  })
  .openapi({ example: { user_id: 1 } });
export const CreateSession = createRoute({
  path: "/sessions",
  method: "post",
  tags,
  request: {
    body: jsonContent(CreateSessionRequestBody, "Request Body"),
  },
  responses: {
    [OK]: jsonContent(
      createSuccessSchema(selectSessionsSchema),
      "Created Session",
    ),
    [UNPROCESSABLE_ENTITY]: jsonContent(
      createValidationErrorSchema(CreateSessionRequestBody),
      "Validation Error(s)",
    ),
  },
});
export type CreateSessionRoute = typeof CreateSession;
