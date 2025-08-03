import type { App } from "octokit";
import { GITHUB_OWNER, GITHUB_REPO, TRUNCATED } from "./constants";

export function onPullRequest(app: App): App {
  app.webhooks.on(
    [
      "pull_request.opened",
      "pull_request.reopened",
      "pull_request.synchronize",
    ],
    async (event) => {
      const { octokit, payload } = event;
      // ref: <https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28#create-a-repository-dispatch-event>
      // The total size of the JSON payload must be less than 64KB.
      if (payload.pull_request.body) payload.pull_request.body = TRUNCATED;
      octokit.log.info(
        `${event.name}.${payload.action}: ${payload.repository.full_name}#${payload.number}`,
      );
      await octokit.rest.repos.createDispatchEvent({
        owner: GITHUB_OWNER,
        repo: GITHUB_REPO,
        event_type: `${event.name}.${payload.action}`,
        client_payload: payload,
      });
    },
  );
  return app;
}
