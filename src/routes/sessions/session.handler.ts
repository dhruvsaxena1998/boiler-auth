import type { AppRouteHandler } from "@/lib/@types/app";

import type { CreateSessionRoute } from "./session.route";

import { GenerateSession } from "./session.service";

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
