# 0006. Designer-driven changes via agent-authored PRs with previews

- Status: Accepted
- Date: 2026-11-01

## Context
Amy (a designer, not an engineer) wants to change her own site with an AI agent.
She can judge a result visually but shouldn't have to read code, run commands, or
learn git. Vercel builds a preview of every PR (ADR 0005); CI runs `npm run check`.

## Decision
We will treat every change as **request → branch → PR → preview → Amy merges**:

- The agent instructions live in `AGENTS.md` (read by Claude Code via `CLAUDE.md` and by
  other agents directly), with detail in `docs/agent-playbook.md`. Amy's side of the
  process is `docs/for-amy.md`.
- The agent opens one PR per request, written in plain language from
  `.github/pull_request_template.md`, and links the preview with `scripts/preview.mjs`,
  which reads Vercel's deployment / commit status / bot comment through `gh` and
  writes the link into the PR description.
- Amy merges. The agent merges only when she explicitly asks, after CI passes.
- `.claude/settings.json` pre-approves the routine commands (npm scripts, branch/commit/
  push to a feature branch, `gh pr` read/create/edit) so Amy isn't asked to approve
  steps she can't evaluate. Pushing to `main` and force-pushing are denied, and merging
  always asks.

## Alternatives considered
- **A CMS (e.g. a headless CMS editing content files)**: Amy's changes are often layout
  and visual, not just copy; a CMS covers only the fields we model, and adds a service.
- **Agent pushes straight to `main`**: no review step; a bad change goes live immediately.
- **Amy edits in GitHub's web editor**: still code, and no visual check before merging.

## Consequences
- Amy needs a GitHub account with write access, `gh` signed in, and the ability to open
  Vercel previews. On the Vercel Hobby plan with a private repo, previews of her commits
  are blocked and preview links need a Vercel login; see
  [deployment.md](../deployment.md#collaborator-previews).
- Agent behaviour is only as good as `AGENTS.md` / the playbook; keep them current when
  the code structure changes (the "Where things are" map in particular).
- Branch protection with a required CI check on `main` is the backstop against merging a
  broken PR, since Vercel deploys whatever is merged.
