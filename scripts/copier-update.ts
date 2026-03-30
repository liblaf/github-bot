import { Octokit } from "octokit";

async function main(): Promise<void> {
  const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
  const owner: string = process.env.GITHUB_REPOSITORY_OWNER!;
  for await (const { data: repos } of octokit.paginate.iterator(
    octokit.rest.repos.listForUser,
    { username: owner },
  )) {
    for (const repo of repos) {
      if (repo.fork || repo.archived) continue;
      try {
        await octokit.rest.actions.createWorkflowDispatch({
          owner: repo.owner.login,
          repo: repo.name,
          workflow_id: "copier-update.yaml",
          ref: "main",
        });
        console.info(`${repo.full_name} / copier-update.yaml`);
      } catch (_) {}
      try {
        await octokit.rest.actions.createWorkflowDispatch({
          owner: repo.owner.login,
          repo: repo.name,
          workflow_id: "shared-copier-update.yaml",
          ref: "main",
        });
        console.info(`${repo.full_name} / shared-copier-update.yaml`);
      } catch (_) {}
    }
  }
}

await main();
