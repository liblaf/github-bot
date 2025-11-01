import { env } from "hono/adapter";
import { Octokit } from "octokit";
import type { Context } from "./context";

export function newUserOctokit(c: Context): Octokit {
  const octokit = new Octokit({ auth: env(c).GH_PAT });
  return octokit;
}
