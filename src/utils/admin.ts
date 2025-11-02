import { env } from "hono/adapter";
import { Octokit } from "octokit";
import { GITHUB_OWNER, GITHUB_REPO } from "../constants";
import type { Context } from "../types";

export async function createRepoDispatch(
  c: Context,
  event_type: string,
  client_payload: { [key: string]: unknown },
): Promise<void> {
  const octokit: Octokit = newAdminOctokit(c);
  await octokit.rest.repos.createDispatchEvent({
    owner: GITHUB_OWNER,
    repo: GITHUB_REPO,
    event_type: event_type,
    client_payload: client_payload,
  });
}

export async function createWorkflowDispatch(
  c: Context,
  workflow_id: string,
  inputs: { [key: string]: unknown },
): Promise<void> {
  const octokit: Octokit = newAdminOctokit(c);
  await octokit.rest.actions.createWorkflowDispatch({
    owner: GITHUB_OWNER,
    repo: GITHUB_REPO,
    workflow_id,
    ref: "main",
    inputs,
  });
}

export function newAdminOctokit(c: Context): Octokit {
  const octokit = new Octokit({ auth: env(c).GH_PAT });
  return octokit;
}
