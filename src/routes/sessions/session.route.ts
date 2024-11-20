import { createRoute } from "@hono/zod-openapi";

import {
  INTERNAL_SERVER_ERROR,
  OK,
  UNPROCESSABLE_ENTITY,
} from "@/lib/constants/http-status-codes";
import {
  createErrorSchema,
  createSuccessSchema,
  createValidationErrorSchema,
  jsonContent,
} from "@/lib/utils/openapi/helpers";

import { GenerateSessionSchema, SelectSessionSchema } from "./session.dto";

export const tags = ["Sessions"];

export const CreateSession = createRoute({
  path: "/sessions",
  method: "post",
  tags,
  request: {
    body: jsonContent(GenerateSessionSchema, "Request Body"),
  },
  responses: {
    [OK]: jsonContent(
      createSuccessSchema(SelectSessionSchema),
      "Created Session",
    ),
    [UNPROCESSABLE_ENTITY]: jsonContent(
      createValidationErrorSchema(GenerateSessionSchema),
      "Validation Error(s)",
    ),
    [INTERNAL_SERVER_ERROR]: jsonContent(
      createErrorSchema("Something went wrong!"),
      "Something went wrong!",
    ),
  },
});
export type CreateSessionRoute = typeof CreateSession;
