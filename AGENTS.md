# amy-portfolio: agent briefing

Portfolio site for **Amy Zeng**, AI product designer. Live at https://www.amyazeng.com.
A static Next.js site; every merge to `main` deploys automatically (Vercel).

## Who you're working with

Usually **Amy**, a designer, not a software engineer. She describes what she wants
to see ("make the heading smaller", "swap my photo", "add a case study") and reviews
the result on a **preview link**. You do all the engineering: edit the code, check
it, open the pull request (PR), and hand her the preview link. She merges.

- **Speak design, not code.** Talk about pages, sections, sizes, colours and spacing.
  Don't paste code or diffs at her, and never ask her to edit files or run commands
  herself. The only exception is a one-time sign-in that needs her browser.
- **Ask only when it changes the result.** For a genuinely ambiguous request, ask one
  short question with concrete options, e.g. "Smaller like the case-study titles (48px),
  or a bit bigger (64px)?". Otherwise make the sensible choice and say what you chose.
- **Do exactly what was asked.** If you notice something else (a typo, a broken link),
  mention it in your reply and the PR's Notes. Don't fix it unasked.
- Sometimes it's **Tarik** (engineer, repo owner) instead; he'll make that obvious, and
  the engineering sections below are for him.

## The change workflow: follow it for every request

Full detail, recipes and troubleshooting: **[docs/agent-playbook.md](docs/agent-playbook.md)**.

1. **Start clean.** Update `main` and create a branch `amy/<short-description>`.
   One request = one branch = one PR. If she's giving feedback on a PR that's still
   open, keep working on *that* PR's branch instead.
2. **Find it.** Use the "Where things are" map in the playbook.
3. **Change it.** Make the smallest edit that does the job, using the existing colours,
   type styles and spacing (`app/globals.css`, `components/`).
4. **Check it.** `npm run check` must pass. Then **look at it**: screenshot every page
   you touched at desktop and phone width (`scripts/shoot.mjs`) and compare with what she asked.
5. **Open the PR.** Commit, push the branch, and open a PR using
   `.github/pull_request_template.md`, written in plain language for Amy.
6. **Get the preview.** Run `node scripts/preview.mjs`. It waits for Vercel's preview,
   puts the link at the top of the PR, and prints it.
7. **Report back** in a few lines: what changed, the **preview link**, the PR link, and
   "Have a look; tell me what to adjust, or merge the PR on GitHub when you're happy."

**Never:** push to `main`, force-push, merge a PR she hasn't explicitly asked you to
merge, rewrite or delete other people's branches, or commit secrets. Don't edit
accepted ADRs in `docs/adr/` (write a new one).

## Version control

- On Amy's machine: plain **git** + **gh**. On Tarik's: **jj**. Use jj only if a `.jj/`
  directory exists; never mix them.
- Commit messages: `type(scope): subject`, e.g. `feat(about): swap portrait photo`.
  PR titles: plain English for Amy, e.g. "Swap the portrait on the About page".

## Engineering reference

- Stack: Next.js 16 static export + Tailwind v4 + Playwright ([ADR 0003](docs/adr/0003-nextjs-static-export.md)).
  **This Next version has breaking changes compared with older training data: read the
  relevant guide in `node_modules/next/dist/docs/` before writing Next code.**
- Green check: `npm run check` (lint, typecheck, static build, Playwright at
  desktop/tablet/mobile). CI runs the same on every PR.
- Docs: [`docs/`](docs/README.md): development guide, deployment, ADRs, work log.
- `design/`: snapshot of the original Figma (reference only; never imported).
- `TECH_DEBT.md`: known shortcuts. Add to it in the same commit as a new shortcut.
- New page → add it to `e2e/routes.ts`. A new decision a future reader might "fix" by
  mistake → new ADR. Update the matching `docs/` page and `docs/worklog.md` with the change.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
