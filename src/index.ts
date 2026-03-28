import crypto from "node:crypto";
import { createWebMiddleware } from "@octokit/webhooks";
import type { Context as HonoContext } from "hono";
import { Hono } from "hono";
import { env } from "hono/adapter";
import type { Octokit } from "octokit";
import { App } from "octokit";

const GITHUB_REPO: string = "github-bot";
type Context = HonoContext<{ Bindings: CloudflareBindings }>;

function onRepositoryCreated(app: App): void {
  app.webhooks.on("repository.created", async ({ payload }) => {
    const { repository } = payload;
    if (repository.archived || repository.fork) return;
    const { data: installation } =
      await app.octokit.rest.apps.getRepoInstallation({
        owner: repository.owner.login,
        repo: GITHUB_REPO,
      });
    const octokit: Octokit = await app.getInstallationOctokit(installation.id);
    await octokit.rest.repos.createDispatchEvent({
      owner: repository.owner.login,
      repo: GITHUB_REPO,
      event_type: "repository.created",
      client_payload: {
        owner: repository.owner.login,
        repo: repository.name,
        repository: repository.full_name,
      },
    });
  });
}

function newGitHubApp(c: Context): App {
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
  app.webhooks.onError((event) => {
    console.error(event);
  });
  onRepositoryCreated(app);
  return app;
}

function newHonoApp(): Hono<{ Bindings: CloudflareBindings }> {
  const app = new Hono<{ Bindings: CloudflareBindings }>();
  app.post("/api/github/webhooks", async (c: HonoContext): Promise<any> => {
    const app: App = newGitHubApp(c);
    const middleware = createWebMiddleware(app.webhooks, {
      path: c.req.path,
      log: console,
    });
    return await middleware(c.req.raw);
  });
  return app;
}

const app: Hono<{ Bindings: CloudflareBindings }> = newHonoApp();

export default app;
