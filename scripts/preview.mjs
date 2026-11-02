#!/usr/bin/env node
// Waits for the Vercel preview of a pull request, writes the link into the PR
// description (between <!-- preview --> markers), and prints it.
//
//   node scripts/preview.mjs              # PR for the current branch
//   node scripts/preview.mjs 12           # PR #12
//   node scripts/preview.mjs 12 --no-edit --timeout=300
//
// Exit codes: 0 found, 1 timed out / error, 2 Vercel reported a failed or blocked deploy.
// Needs only `gh` (signed in); no jq.
import { execFileSync } from "node:child_process";

const args = process.argv.slice(2);
const prArg = args.find((a) => /^\d+$/.test(a));
const edit = !args.includes("--no-edit");
const timeoutS = Number(args.find((a) => a.startsWith("--timeout="))?.split("=")[1] ?? 600);

const gh = (...a) => execFileSync("gh", a, { encoding: "utf8", stdio: ["pipe", "pipe", "pipe"] }).trim();
const api = (path) => JSON.parse(gh("api", path));
const sleep = (s) => new Promise((r) => setTimeout(r, s * 1000));
const say = (msg) => console.error(msg);

const pr = JSON.parse(gh("pr", "view", ...(prArg ? [prArg] : []), "--json", "number,url,headRefOid,body"));
const repo = gh("repo", "view", "--json", "nameWithOwner", "-q", ".nameWithOwner");
const sha = pr.headRefOid;
say(`PR #${pr.number}, commit ${sha.slice(0, 7)}: waiting for the Vercel preview…`);

const PREVIEW_HOST = /https:\/\/[a-z0-9-]+\.vercel\.app\b/i;

/** GitHub Deployments created by Vercel carry the preview URL as environment_url. */
function fromDeployments() {
  for (const d of api(`repos/${repo}/deployments?sha=${sha}&per_page=10`)) {
    if (/production/i.test(d.environment)) continue;
    const [status] = api(`repos/${repo}/deployments/${d.id}/statuses?per_page=1`);
    if (status?.state === "success" && status.environment_url) return status.environment_url;
  }
  return null;
}

/** The Vercel commit status: pending / success / failure / error, with a description. */
function vercelStatus() {
  const { statuses } = api(`repos/${repo}/commits/${sha}/status`);
  return statuses.find((s) => /vercel/i.test(s.context)) ?? null;
}

/** The Vercel bot's PR comment links "Preview" to a *.vercel.app URL. */
function fromBotComment() {
  const comments = api(`repos/${repo}/issues/${pr.number}/comments?per_page=100`);
  for (const c of comments.reverse()) {
    if (!/vercel/i.test(c.user?.login ?? "")) continue;
    const url = c.body.match(PREVIEW_HOST)?.[0];
    if (url) return url;
  }
  return null;
}

let url = null;
let successSince = null;
const started = Date.now();
while (!url && (Date.now() - started) / 1000 < timeoutS) {
  try {
    url = fromDeployments();
    if (url) break;
    const status = vercelStatus();
    if (status?.state === "failure" || status?.state === "error") {
      say(`\nVercel did not deploy this commit: "${status.description}"`);
      say(`Details: ${status.target_url}`);
      say(
        "This is a hosting/account issue, not a problem with the change itself. " +
          "Tell Amy the PR is ready but the preview is blocked, and ask Tarik to check Vercel " +
          "(docs/deployment.md#collaborator-previews).",
      );
      process.exit(2);
    }
    if (status?.state === "success") {
      url = fromBotComment() ?? (PREVIEW_HOST.test(status.target_url ?? "") ? status.target_url : null);
      successSince ??= Date.now();
      // Deploy finished but no link surfaced yet (bot comment can lag): give it a minute,
      // then fall back to Vercel's deployment page, which links to the preview.
      if (!url && Date.now() - successSince > 60_000) url = status.target_url;
    } else if (!status && (Date.now() - started) / 1000 > 180) {
      say("Still no Vercel status after 3 minutes; is the Vercel GitHub app connected to this repo?");
    }
  } catch (e) {
    say(`(retrying after error: ${e.message.split("\n")[0]})`);
  }
  if (!url) await sleep(10);
}

if (!url) {
  say(`Timed out after ${timeoutS}s without a preview. Check the PR's checks: ${pr.url}/checks`);
  process.exit(1);
}

// Previews behind Vercel Authentication redirect to a login page Amy can't pass.
try {
  const res = await fetch(url, { redirect: "manual" });
  if (res.status === 401 || res.status === 403 || (res.status >= 300 && res.status < 400 && /vercel\.com\/(login|sso)/.test(res.headers.get("location") ?? ""))) {
    say(
      "Note: this preview is behind Vercel's login (Deployment Protection), so Amy may not be able to open it. " +
        "See docs/deployment.md#collaborator-previews.",
    );
  }
} catch {
  // Network check is best effort.
}

if (edit) {
  const line = `**Preview:** <!-- preview -->${url}<!-- /preview -->`;
  const body = pr.body ?? "";
  const next = /<!-- preview -->[\s\S]*?<!-- \/preview -->/.test(body)
    ? body.replace(/\*{0,2}Preview:?\*{0,2}\s*<!-- preview -->[\s\S]*?<!-- \/preview -->/, line)
    : `${line}\n\n${body}`;
  if (next !== body) execFileSync("gh", ["pr", "edit", String(pr.number), "--body-file", "-"], { input: next });
  say(`Added the preview link to ${pr.url}`);
}

console.log(url);
