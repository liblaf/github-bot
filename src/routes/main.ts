import { Scalar } from "@scalar/hono-api-reference";
import { fromHono } from "chanfana";
import { Hono } from "hono";
import { description, version } from "../../package.json";
import { registerLLMRoutes } from "./llms";
import { Webhooks } from "./webhooks";

export function newHonoApp(): Hono<{ Bindings: CloudflareBindings }> {
  const app = new Hono<{ Bindings: CloudflareBindings }>();
  const openapi = fromHono(app, {
    schema: {
      info: {
        title: "GitHub Bot",
        description,
        version,
      },
    },
  });
  openapi.get("/", Scalar({ url: "/openapi.json" }));
  openapi.post("/api/github/webhooks", Webhooks);
  registerLLMRoutes(app, openapi);
  return app;
}
