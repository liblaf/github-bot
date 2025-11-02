import type { App } from "octokit";
import type { Context } from "../types";
import { createRepoDispatch } from "../utils";

export function onReleasePlease(c: Context, app: App): void {
  app.webhooks.on("push", async ({ octokit, payload }) => {
    const { repository } = payload;
    if (repository.archived || repository.fork) return;
    const ref: string = payload.ref;
    if (ref !== `refs/heads/${repository.default_branch}`) return;
    const owner: string = repository.owner!.login;
    const repo: string = repository.name;
    // ref: <https://docs.github.com/en/rest/checks/runs?apiVersion=2022-11-28#create-a-check-run>
    const checkRun = (
      await octokit.rest.checks.create({
        owner,
        repo,
        name: "Release Please",
        head_sha: payload.after,
        status: "queued",
      })
    ).data;
    await createRepoDispatch(c, "release-please", {
      check_run_id: checkRun.id,
      owner,
      ref,
      repo,
      repository: repository.full_name,
    });
  });
}
