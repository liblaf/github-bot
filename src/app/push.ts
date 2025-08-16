import type { App } from "octokit";
import * as R from "remeda";
import { GITHUB_OWNER, GITHUB_REPO } from "./constants";

export function onPush(app: App): App {
  app.webhooks.on("push", async (event) => {
    const { octokit } = event;
    // ref: <https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28#create-a-repository-dispatch-event>
    // The maximum number of top-level properties is 10.
    const payload = R.pick(event.payload, ["ref", "repository"]);
    if (payload.repository.fork) return;
    if (payload.ref !== "refs/heads/main") return;
    octokit.log.info(
      `${event.name}.${payload.ref}: ${payload.repository.full_name}@${payload.ref}`,
    );
    await octokit.rest.repos.createDispatchEvent({
      owner: GITHUB_OWNER,
      repo: GITHUB_REPO,
      event_type: event.name,
      client_payload: payload,
    });
  });
  return app;
}
