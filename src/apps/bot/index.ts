import { createWebMiddleware } from "@octokit/webhooks";
import { OpenAPIRoute } from "chanfana";
import { env } from "hono/adapter";
import type { App, Octokit } from "octokit";
import { GITHUB_OWNER, GITHUB_REPO } from "../../constants";
import type { Context } from "../../utils";
import { newGitHubApp, newUserOctokit } from "../../utils";

export class Bot extends OpenAPIRoute {
  override async handle(c: Context): Promise<Response> {
    const app: App = newGitHubApp({
      appId: env(c).BOT_APP_ID,
      privateKey: env(c).BOT_PRIVATE_KEY,
      webhooks: { secret: env(c).BOT_WEBHOOK_SECRET },
    });

    app.webhooks.on("repository.created", async ({ payload }) => {
      if (payload.repository.fork) return;
      const pat: Octokit = newUserOctokit(c);
      await pat.rest.repos.createDispatchEvent({
        owner: GITHUB_OWNER,
        repo: GITHUB_REPO,
        event_type: "bot.repository.created",
        client_payload: {
          owner: payload.repository.owner!.login,
          repo: payload.repository.name,
          repository: payload.repository.full_name,
        },
      });
    });

    app.webhooks.on(
      [
        "pull_request_review.dismissed",
        "pull_request.opened",
        "pull_request.reopened",
        "pull_request.synchronize",
      ],
      async ({ payload }) => {
        if (payload.repository.archived || payload.repository.fork) return;
        const pat: Octokit = newUserOctokit(c);
        if (payload.pull_request.user?.type !== "Bot") return;
        if (
          !payload.pull_request.labels.some((label) => label.name === "autofix")
        )
          return;
        const user: string = (await pat.rest.users.getAuthenticated()).data
          .login;
        const owner: string = payload.repository.owner!.login;
        const repo: string = payload.repository.name;
        const pull_number: number = payload.pull_request.number;
        for await (const { data: reviews } of pat.paginate.iterator(
          pat.rest.pulls.listReviews,
          { owner, repo, pull_number },
        )) {
          for (const review of reviews) {
            if (review.user?.login !== user) continue;
            if (review.state !== "APPROVED") continue;
            return;
          }
        }
        // wait for review requests
        await new Promise((resolve) => setTimeout(resolve, 5000));
        await pat.rest.pulls.createReview({
          owner,
          repo,
          pull_number,
          event: "APPROVE",
        });
      },
    );

    const middleware = createWebMiddleware(app.webhooks, {
      log: console,
      path: c.req.path,
    });
    return middleware(c.req.raw);
  }
}
