import { prettyJSON } from "hono/pretty-json";
import { secureHeaders } from "hono/secure-headers";

import ENV from "@/env";
import createApp from "@/lib/utils/create-app";
import configureOpenApiSpec from "@/lib/utils/openapi/configure-openapi-spec";
import RootRouter from "@/routes/root-router";
import SessionRouter from "@/routes/sessions";
import { pinoHttpLogger } from "@/utils/logger";

import packageJSON from "../package.json" with { type: "json" };

const app = createApp();

app.use(secureHeaders());
app.use(pinoHttpLogger());
app.use(prettyJSON());

if (ENV.NODE_ENV !== "prod") {
  configureOpenApiSpec(app, {
    title: packageJSON.name,
    version: packageJSON.version,
  });
}

const _app = app.route("/", RootRouter).route("/", SessionRouter);

export { app };
export type App = typeof _app;
