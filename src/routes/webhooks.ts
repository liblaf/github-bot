import { createWebMiddleware } from "@octokit/webhooks";
import { OpenAPIRoute } from "chanfana";
import type { App } from "octokit";
import { newGitHubApp } from "../apps";
import type { Context } from "../types";

export class Webhooks extends OpenAPIRoute {
  override async handle(c: Context): Promise<Response> {
    const app: App = newGitHubApp(c);
    const middleware = createWebMiddleware(app.webhooks, {
      path: c.req.path,
      log: console,
    });
    return middleware(c.req.raw);
  }
}
