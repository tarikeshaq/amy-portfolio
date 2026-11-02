# Deployment

Hosted on Vercel ([ADR 0005](adr/0005-host-on-vercel.md)).

| Event | Result |
|---|---|
| Push / merge to `main` | Production deploy |
| PR opened or updated | Preview deploy (URL posted on the PR by the Vercel bot) + CI (`ci.yml`) |

## Vercel project settings
Vercel autodetects these; listed so they can be checked or recreated.

| Setting | Value |
|---|---|
| Framework preset | Next.js |
| Root directory | `./` |
| Build command | `npm run build` (default) |
| Output | handled by Next (`output: "export"` → `out/`) |
| Install command | `npm ci` (default with a lockfile) |
| Node.js version | 22.x or newer (`engines.node` is `>=20.9`) |
| Production branch | `main` |
| Environment variables | none |

## One-time setup (manual, in the browser)
1. Sign in at vercel.com with GitHub.
2. **Add New → Project**, then install / configure the Vercel GitHub app with access
   to `tarikeshaq/amy-portfolio` only.
3. Import the repo; keep the detected settings above; **Deploy**.
4. Optional: **Settings → Domains** to add a custom domain, then create the DNS
   records Vercel shows at the registrar.
5. Optional but recommended: in GitHub, protect `main` and require the `check` job
   from CI (see below).

## Branch protection (gh)
```bash
gh api -X PUT repos/tarikeshaq/amy-portfolio/branches/main/protection \
  --input - <<'JSON'
{"required_status_checks":{"strict":true,"contexts":["check"]},
 "enforce_admins":false,"required_pull_request_reviews":null,"restrictions":null}
JSON
```
Branch protection on private repos needs GitHub Pro (or a public repo).

## Collaborator previews
Amy's agent opens PRs and Amy reviews the Vercel preview (ADR 0006). Two Vercel
Hobby-plan limits get in the way:

1. **Commits by anyone other than the Vercel account owner don't deploy from a private
   repo** (Hobby doesn't support collaboration on private repos). The PR shows a failed
   "Vercel" check, and `scripts/preview.mjs` exits 2 with Vercel's message.
2. **Preview URLs sit behind Vercel Authentication by default** (Deployment Protection,
   "Standard Protection"). Only members of the Vercel account can open them, and a Hobby
   account can't add members.

Fixes (pick one per limit):

| Limit | Option | Trade-off |
|---|---|---|
| 1 | Make the GitHub repo **public** | Free. The code and the `design/` snapshot become public, though the site itself already is. |
| 1 | Vercel **Pro** ($20/mo) and invite Amy | Keeps the repo private; adds a monthly cost. |
| 1 | Move the Vercel project (and ideally the repo) to **Amy's own account** | Free, and she owns her site; Tarik's own commits then need the same treatment. |
| 2 | Project → Settings → **Deployment Protection** → turn off Vercel Authentication | Previews become reachable by anyone with the (unguessable) link. Production is public anyway. |

## Rollback
Vercel dashboard → Deployments → pick the last good production deploy → **Promote to Production**.
