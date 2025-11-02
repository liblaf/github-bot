import type { App } from "octokit";
import type { Context } from "../types";
import { createRepoDispatch } from "../utils";

export function onSyncRepoSettings(c: Context, app: App): void {
  app.webhooks.on("repository.created", async ({ payload }) => {
    const { repository } = payload;
    if (repository.archived || repository.fork) return;
    await createRepoDispatch(c, "sync-repo-settings", {
      owner: repository.owner!.login,
      repo: repository.name,
      repository: repository.full_name,
    });
  });
}
