import type { App } from "octokit";
import { GITHUB_OWNER, GITHUB_REPO } from "./constants";

export function onRepository(app: App): App {
  app.webhooks.on(["repository.created"], async (event) => {
    const { octokit, payload } = event;
    octokit.log.info(
      `${event.name}.${payload.action}: ${payload.repository.full_name}`,
    );
    await octokit.rest.repos.createDispatchEvent({
      owner: GITHUB_OWNER,
      repo: GITHUB_REPO,
      event_type: `${event.name}.${payload.action}`,
      client_payload: payload,
    });
  });
  return app;
}
