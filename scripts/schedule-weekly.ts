import { Octokit } from "octokit";

function getActionOwnerRepo(): [string, string] {
  const [owner, repo] = process.env.GITHUB_REPOSITORY!.split("/");
  return [owner!, repo!];
}

async function main(): Promise<void> {
  const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
  const owner: string = process.env.GITHUB_REPOSITORY_OWNER!;
  const [actionOwner, actionRepo] = getActionOwnerRepo();
  for await (const { data: repos } of octokit.paginate.iterator(
    octokit.rest.repos.listForUser,
    { username: owner },
  )) {
    for (const repo of repos) {
      if (repo.fork || repo.archived) continue;
      console.info(repo.full_name);
      octokit.rest.repos.createDispatchEvent({
        owner: actionOwner,
        repo: actionRepo,
        event_type: "schedule.weekly",
        client_payload: {
          owner: repo.owner.login,
          repo: repo.name,
          repository: repo.full_name,
        },
      });
    }
  }
}

await main();
