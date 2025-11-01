import { createWebMiddleware } from "@octokit/webhooks";
import { OpenAPIRoute } from "chanfana";
import { env } from "hono/adapter";
import type { App, Octokit } from "octokit";
import { GITHUB_OWNER, GITHUB_REPO } from "../../constants";
import type { Context } from "../../utils";
import { newDispatchOctokit, newGitHubApp } from "../../utils";

export class Misc extends OpenAPIRoute {
  override async handle(c: Context): Promise<Response> {
    const app: App = newGitHubApp({
      appId: env(c).MISC_APP_ID,
      privateKey: env(c).MISC_PRIVATE_KEY,
      webhooks: { secret: env(c).MISC_WEBHOOK_SECRET },
    });
    app.webhooks.on("repository.created", async ({ payload }) => {
      if (payload.repository.fork) return;
      const dispatch: Octokit = newDispatchOctokit(c);
      dispatch.rest.repos.createDispatchEvent({
        owner: GITHUB_OWNER,
        repo: GITHUB_REPO,
        event_type: "bot.misc.repository.created",
        client_payload: {
          owner: payload.repository.owner!.login,
          repo: payload.repository.name,
          repository: payload.repository.full_name,
        },
      });
    });
    const middleware = createWebMiddleware(app.webhooks, {
      log: console,
      path: c.req.path,
    });
    return middleware(c.req.raw);
  }
}
