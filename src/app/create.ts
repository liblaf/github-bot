import type { App } from "octokit";
import { GITHUB_OWNER, GITHUB_REPO } from "./constants";

export function onCreate(app: App): App {
  app.webhooks.on("create", async (event) => {
    const { octokit, payload } = event;
    octokit.log.info(
      `${event.name}: ${payload.repository.full_name} (${payload.ref})`,
    );
    await octokit.rest.repos.createDispatchEvent({
      owner: GITHUB_OWNER,
      repo: GITHUB_REPO,
      event_type: `${event.name}`,
      client_payload: payload,
    });
  });
  return app;
}
