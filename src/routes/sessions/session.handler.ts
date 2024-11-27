import type { AppRouteHandler } from "@/lib/@types/app";

import type { CreateSessionRoute, ValidateSessionRoute } from "./session.route";

import { GenerateSession, ValidateSession } from "./session.service";

export const CreateSessionHandler: AppRouteHandler<CreateSessionRoute> = async (
  ctx,
) => {
  const json = ctx.req.valid("json");

  const result = await GenerateSession({
    user_id: json.user_id,
  });

  if (result.isErr()) {
    return ctx.json(
      {
        success: false,
        error: { issues: [{ message: result.error.message }] },
      },
      result.error.code,
    );
  }

  return ctx.json(
    { success: true, data: result.value.data },
    result.value.code,
  );
};

export const ValidateSessionHandler: AppRouteHandler<
  ValidateSessionRoute
> = async (ctx) => {
  const authorization = ctx.req.valid("header").authorization;

  const result = await ValidateSession({ authorization });

  if (result.isErr()) {
    return ctx.json(
      {
        success: false,
        error: { issues: [{ message: result.error.message }] },
      },
      result.error.code,
    );
  }

  return ctx.json(
    {
      success: true,
      data: {
        message: "Session validated successfully!",
        session: result.value.session,
      },
    },
    result.value.code,
  );
};
