import { env } from "hono/adapter";
import { Octokit } from "octokit";
import type { Context } from "./context";

export function newDispatchOctokit(c: Context): Octokit {
  const octokit = new Octokit({ auth: env(c).DISPATCH_TOKEN });
  return octokit;
}
