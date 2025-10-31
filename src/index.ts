import { Scalar } from "@scalar/hono-api-reference";
import { fromHono } from "chanfana";
import { Hono } from "hono";
import { description, version } from "../package.json";
import { ReleasePlease } from "./apps";

const app: Hono<{ Bindings: CloudflareBindings }> = new Hono<{
  Bindings: CloudflareBindings;
}>();

const openapi = fromHono(app, {
  schema: {
    info: {
      description,
      title: "GitHub Bot",
      version,
    },
    externalDocs: {
      description: "GitHub",
      url: "https://github.com/liblaf/github-bot",
    },
  },
});

openapi.get("/", Scalar({ url: "/openapi.json" }));
openapi.post("/api/github/release-please/webhooks", ReleasePlease);

export default app;
