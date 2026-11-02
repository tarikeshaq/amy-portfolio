# 0005. Host on Vercel via its GitHub integration

- Status: Accepted
- Date: 2026-11-01

## Context
The site is a static export (ADR 0003) in a private GitHub repo on a personal
account. Pushes to `main` should deploy automatically; PRs should be reviewable
before merging. There is no backend, no data, and no budget.

## Decision
We will host on **Vercel (Hobby plan)** using its GitHub app: production deploys
from `main`, and every PR gets a preview deployment. GitHub Actions (`ci.yml`) runs
`npm run check` independently, so a red build is visible on the PR before merge.

## Alternatives considered
- **GitHub Pages**: needs a paid GitHub plan for private repos, and Next's asset paths
  need a `basePath` unless a custom domain is used. No PR previews.
- **Cloudflare Pages / Netlify**: equivalent for a static site; Vercel is the
  owner's preference and the native host for Next.js.
- **GCS + Cloud CDN under the usual GCP/Terraform stack**: an HTTPS load balancer
  costs ~$18/month idle plus certs and Terraform, for four static pages.

## Consequences
- Deploy config lives in the Vercel dashboard (project settings), not in the repo
  or Terraform. `docs/deployment.md` records it.
- Vercel deploys even if CI fails; branch protection on `main` (required CI check)
  is what keeps broken builds out of production.
- Hobby is for non-commercial use, which a personal portfolio is. If the site ever
  moves to Amy's own account, transfer the Vercel project and the repo together.
