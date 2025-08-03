import type { App } from "octokit";
import { GITHUB_OWNER, GITHUB_REPO, TRUNCATED } from "./constants";

export function onPullRequest(app: App): App {
  app.webhooks.on("pull_request", async (event) => {
    const { octokit, payload } = event;
    octokit.log.info(
      `${event.name}.${payload.action}: ${payload.repository.full_name}#${payload.number}`,
    );
    // limit payload size
    if (payload.pull_request.body) payload.pull_request.body = TRUNCATED;
    switch (payload.action) {
      case "edited":
        if (payload.changes.body?.from) payload.changes.body.from = TRUNCATED;
        break;
    }
    await octokit.rest.repos.createDispatchEvent({
      owner: GITHUB_OWNER,
      repo: GITHUB_REPO,
      event_type: `${event.name}.${payload.action}`,
      client_payload: payload,
    });
  });
  return app;
}
