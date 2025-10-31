import crypto from "node:crypto";
import { App } from "octokit";

type newGitHubAppOptions = {
  appId: string;
  privateKey: string;
  webhooks: { secret: string };
};

export function newGitHubApp({
  appId,
  privateKey,
  webhooks,
}: newGitHubAppOptions): App {
  // ref: <https://github.com/octokit/auth-app.js?tab=readme-ov-file#usage-with-octokit>
  privateKey = crypto
    .createPrivateKey(privateKey)
    .export({ type: "pkcs8", format: "pem" })
    .toString();
  const app = new App({ appId, log: console, privateKey, webhooks });
  app.webhooks.onError((err) => {
    console.error(err);
  });
  return app;
}
