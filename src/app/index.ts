import crypto from "node:crypto";
import { App } from "octokit";
import { onCreate } from "./create";
import { onPullRequest } from "./pull_request";
import { onPullRequestReview } from "./pull_request_review";
import { onPush } from "./push";
import { onRepository } from "./repository";

export type GitHubAppOptions = {
  appId: number | string;
  privateKey: string;
  webhookSecret: string;
};

export function makeGitHubApp({
  appId,
  privateKey,
  webhookSecret: secret,
}: GitHubAppOptions): App {
  privateKey = crypto
    .createPrivateKey(privateKey)
    .export({ type: "pkcs8", format: "pem" })
    .toString();
  const app = new App({
    appId,
    privateKey,
    webhooks: { secret },
    log: console,
  });
  app.webhooks.onError((error) => {
    console.error(`${error}`);
  });
  onCreate(app);
  onPullRequest(app);
  onPullRequestReview(app);
  onPush(app);
  onRepository(app);
  return app;
}
