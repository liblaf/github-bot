import { createWebMiddleware } from "@octokit/webhooks";
import { OpenAPIRoute } from "chanfana";
import { env } from "hono/adapter";
import type { App, Octokit } from "octokit";
import { GITHUB_OWNER, GITHUB_REPO } from "../../constants";
import type { Context } from "../../utils";
import { newDispatchOctokit, newGitHubApp } from "../../utils";

export class ReleasePlease extends OpenAPIRoute {
  override async handle(c: Context): Promise<Response> {
    const app: App = newGitHubApp({
      appId: env(c).RELEASE_PLEASE_APP_ID,
      privateKey: env(c).RELEASE_PLEASE_PRIVATE_KEY,
      webhooks: { secret: env(c).RELEASE_PLEASE_WEBHOOK_SECRET },
    });
    app.webhooks.on("push", async ({ payload }) => {
      const octokit: Octokit = newDispatchOctokit(c);
      await octokit.rest.actions.createWorkflowDispatch({
        owner: GITHUB_OWNER,
        repo: GITHUB_REPO,
        workflow_id: "bot-release-please.yaml",
        ref: "main",
        inputs: {
          owner: payload.repository.owner!.login,
          ref: payload.ref,
          repo: payload.repository.name,
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
