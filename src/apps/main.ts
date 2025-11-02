import crypto from "node:crypto";
import { env } from "hono/adapter";
import { App } from "octokit";
import type { Context } from "../types";
import { onAutoApprove } from "./auto-approve";
import { onMegaLinter } from "./mega-linter";
import { onReleasePlease } from "./release-please";
import { onSyncRepoSettings } from "./sync-repo-settings";

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
  onAutoApprove(c, app);
  onMegaLinter(c, app);
  onReleasePlease(c, app);
  onSyncRepoSettings(c, app);
  return app;
}
