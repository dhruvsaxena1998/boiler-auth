import { createRoute, z } from "@hono/zod-openapi";

import {
  INTERNAL_SERVER_ERROR,
  OK,
  UNAUTHORIZED,
  UNPROCESSABLE_ENTITY,
} from "@/lib/constants/http-status-codes";
import {
  createErrorSchema,
  createSuccessSchema,
  createValidationErrorSchema,
  jsonContent,
} from "@/lib/utils/openapi/helpers";

import {
  GenerateSessionSchema,
  SelectSessionSchema,
  ValidatedSessionSchema,
  ValidateSessionSchema,
} from "./session.dto";

export const tags = ["Sessions"];

export const CreateSession = createRoute({
  path: "/sessions",
  method: "post",
  description: "Create a new session",
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

export const ValidateSession = createRoute({
  path: "/sessions/validate",
  method: "get",
  description: "Validate Session",
  tags,
  request: {
    headers: ValidateSessionSchema,
  },
  responses: {
    [OK]: jsonContent(
      createSuccessSchema(ValidatedSessionSchema),
      "Validated Session",
    ),
    [UNPROCESSABLE_ENTITY]: jsonContent(
      createValidationErrorSchema(ValidateSessionSchema),
      "Validation Error(s)",
    ),
    [UNAUTHORIZED]: jsonContent(
      createErrorSchema("Unauthorized"),
      "Unauthorized",
    ),
  },
});
export type ValidateSessionRoute = typeof ValidateSession;
