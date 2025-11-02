import type { App } from "octokit";
import type { Context } from "../types";
import { createRepoDispatch } from "../utils";

export function onMegaLinter(c: Context, app: App): void {
  app.webhooks.on("push", async ({ octokit, payload }) => {
    const { repository } = payload;
    if (repository.archived || repository.fork) return;
    const ref: string = payload.ref;
    if (!ref.startsWith("refs/heads/")) return;
    const branch: string = ref.replace("/refs/heads/", "");
    if (branch === "gh-pages") return;
    if (branch.startsWith("assets")) return;
    if (branch.startsWith("dist")) return;
    if (branch.startsWith("release")) return;
    const owner: string = repository.owner!.login;
    const repo: string = repository.name;
    // ref: <https://docs.github.com/en/rest/checks/runs?apiVersion=2022-11-28#create-a-check-run>
    const checkRun = await octokit.rest.checks.create({
      owner,
      repo,
      name: "MegaLinter",
      head_sha: payload.after,
      status: "queued",
    });
    await createRepoDispatch(c, "mega-linter", {
      check_run_id: checkRun.data.id,
      owner,
      ref,
      repo,
      repository: repository.full_name,
    });
  });
}
