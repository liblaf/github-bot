import type { App, Octokit } from "octokit";
import type { Context } from "../types";
import { newAdminOctokit } from "../utils";

export function onAutoApprove(c: Context, app: App): void {
  app.webhooks.on(
    [
      "pull_request_review.dismissed",
      "pull_request.opened",
      "pull_request.reopened",
    ],
    async ({ octokit, payload }) => {
      const { pull_request, repository } = payload;
      if (repository.archived || repository.fork) return;
      if (pull_request.user!.type !== "Bot") return;
      if (!contains(pull_request.labels, "autofix")) return;
      const admin: Octokit = newAdminOctokit(c);
      const user: string = (await admin.rest.users.getAuthenticated()).data
        .login;
      const owner: string = repository.owner!.login;
      const repo: string = repository.name;
      const pull_number: number = pull_request.number;
      for await (const { data: reviews } of octokit.paginate.iterator(
        octokit.rest.pulls.listReviews,
        { owner, repo, pull_number },
      )) {
        for (const review of reviews) {
          if (review.user!.login !== user) continue;
          if (review.state !== "APPROVED") continue;
          // found an existing approval
          return;
        }
      }
      // wait for review requests
      await new Promise((resolve) => setTimeout(resolve, 5000));
      await admin.rest.pulls.createReview({
        owner,
        repo,
        pull_number,
        event: "APPROVE",
      });
    },
  );
}

function contains(arr: { name: string }[], val: string): boolean {
  return arr.some((item) => item.name === val);
}
