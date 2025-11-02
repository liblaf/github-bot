import crypto from "node:crypto";
import { env } from "hono/adapter";
import { App } from "octokit";
import type { Context } from "../types";

export function newGitHubApp(c: Context): App {
  const appId: string = env(c).APP_ID;
  const privateKey: string = crypto
    .createPrivateKey(env(c).PRIVATE_KEY)
    .export({ type: "pkcs8", format: "pem" })
    .toString();
  const webhookSecret: string = env(c).WEBHOOK_SECRET;
  const app = new App({
    appId,
    log: console,
    privateKey,
    webhooks: { secret: webhookSecret },
  });
  app.webhooks.onError((err) => {
    console.error(err);
  });
  return app;
}
