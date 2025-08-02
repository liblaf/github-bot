import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import { createWebMiddleware } from "@octokit/webhooks";
import { Scalar } from "@scalar/hono-api-reference";
import { env } from "hono/adapter";
import { HTTPException } from "hono/http-exception";
import { UAParser } from "ua-parser-js";
import { version } from "../package.json";
import { makeGitHubApp } from "./app";

const app = new OpenAPIHono<{ Bindings: CloudflareBindings }>();

app.doc("/openapi.json", {
  openapi: "3.0.0",
  info: { title: "github-bot", version },
  externalDocs: {
    description: "GitHub",
    url: "https://github.com/liblaf/github-bot",
  },
});

app.onError((error, ctx): Response => {
  console.error(`${error}`);
  if (error instanceof HTTPException) return error.getResponse();
  return ctx.json({ error }, 500);
});

app.get("/", (c) => {
  const ua = UAParser(c.req.header("User-Agent"));
  if (ua.browser.name) return c.redirect("/reference");
  return c.newResponse(null, 204);
});

app.get("/reference", Scalar({ url: "/openapi.json" }));

app.openapi(
  createRoute({
    method: "post",
    path: "/api/github/webhooks",
    responses: { 200: { description: "OK" } },
  }),
  async (c) => {
    const app = makeGitHubApp({
      appId: env(c).GITHUB_APP_ID,
      privateKey: env(c).GITHUB_APP_PRIVATE_KEY,
      webhookSecret: env(c).GITHUB_APP_WEBHOOK_SECRET,
    });
    const middleware = createWebMiddleware(app.webhooks, { path: c.req.path });
    return await middleware(c.req.raw);
  },
);

export default app;
