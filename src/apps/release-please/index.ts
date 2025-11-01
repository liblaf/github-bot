import { createWebMiddleware } from "@octokit/webhooks";
import { OpenAPIRoute } from "chanfana";
import dayjs from "dayjs";
import { env } from "hono/adapter";
import type { App, Octokit } from "octokit";
import { GITHUB_OWNER, GITHUB_REPO } from "../../constants";
import type { Context } from "../../utils";
import { newDispatchOctokit, newGitHubApp } from "../../utils";

const WORKFLOW_ID = "bot-release-please.yaml";

export class ReleasePlease extends OpenAPIRoute {
  override async handle(c: Context): Promise<Response> {
    const app: App = newGitHubApp({
      appId: env(c).RELEASE_PLEASE_APP_ID,
      privateKey: env(c).RELEASE_PLEASE_PRIVATE_KEY,
      webhooks: { secret: env(c).RELEASE_PLEASE_WEBHOOK_SECRET },
    });
    app.webhooks.on("push", async ({ octokit, payload }) => {
      if (payload.repository.fork) return;
      const ref: string = payload.ref;
      if (ref !== `refs/heads/${payload.repository.default_branch}`) return;
      const owner: string = payload.repository.owner!.login;
      const repo: string = payload.repository.name;
      // ref: <https://docs.github.com/en/rest/checks/runs?apiVersion=2022-11-28#create-a-check-run>
      const checkRun = (
        await octokit.rest.checks.create({
          owner,
          repo,
          name: "Release Please",
          head_sha: payload.after,
          details_url: `https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}/actions/workflows/${WORKFLOW_ID}`,
          status: "queued",
          started_at: dayjs().toISOString(),
        })
      ).data;
      const dispatch: Octokit = newDispatchOctokit(c);
      await dispatch.rest.repos.createDispatchEvent({
        owner: GITHUB_OWNER,
        repo: GITHUB_REPO,
        event_type: "bot.release-please.push",
        client_payload: {
          check_run_id: checkRun.id,
          owner,
          ref,
          repo,
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
