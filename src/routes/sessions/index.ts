import { createRouter } from "@/lib/utils/create-app";

import * as handlers from "./session.handler";
import * as routes from "./session.route";

export default createRouter().openapi(
  routes.CreateSession,
  handlers.CreateSessionHandler,
);
