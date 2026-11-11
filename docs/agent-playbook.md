# Agent playbook: turning Amy's requests into PRs

The detailed version of the workflow in [`AGENTS.md`](../AGENTS.md). Amy is a designer;
you do the engineering and hand her a preview link. She reviews and merges.

## 0. First-time setup (once per machine)

Check each item and fix what's missing. Ask Amy before installing software.

| Need | Check | Fix |
|---|---|---|
| The repo | you're in a folder with `package.json` named `amy-portfolio` | `gh repo clone tarikeshaq/amy-portfolio && cd amy-portfolio` |
| Node 20.9+ | `node -v` | macOS: `brew install node` (needs Homebrew: https://brew.sh) |
| git | `git --version` | macOS: `xcode-select --install` |
| GitHub CLI, signed in | `gh auth status` | `brew install gh`, then Amy runs `gh auth login -h github.com -p https -w`. In Claude Code she types it with a `!` in front. A browser opens; she clicks *Authorize*. |
| git identity | `git config user.name` and `user.email` | Ask Amy for her name and the email on her GitHub account, then `git config --global user.name "…"` / `user.email "…"` |
| Dependencies | `node_modules/` exists | `npm ci && npx playwright install chromium` |
| Push access | `gh repo view tarikeshaq/amy-portfolio --json viewerPermission` shows `WRITE` or `ADMIN` | Amy asks Tarik to add her as a collaborator, then accepts the email invite |

## 1. Start clean

```bash
git switch main && git pull
git switch -c amy/<short-description>      # e.g. amy/smaller-home-heading
```

Feedback on an open PR? Check out that PR's branch instead (`gh pr checkout <number>`)
and add commits to it. Don't open a second PR for the same change.

## 2. Where things are

| On the site | File |
|---|---|
| Nav bar (HOME / WORK / ABOUT / RESUME / CONTACT) | `components/TopNav.tsx` |
| Footer (orchid, "Find me on Linkedin", "Email me", credit line) | `components/Footer.tsx` |
| Email address, LinkedIn URL, resume link, browser-tab title, site description | `lib/site.ts` |
| List of case studies (titles + order on the home page) | `lib/site.ts` → `caseStudies` |
| Home page: hero ("Hi! I'm Amy"), stick figure, "Selected work" cards | `app/page.tsx` |
| About page (collage of photos and text) | `app/about/page.tsx` |
| Case study: compute costs | `app/work/compute-costs/page.tsx` |
| Case study: thought partner | `app/work/thought-partner/page.tsx` |
| 404 "Page not found" page | `app/not-found.tsx` |
| Colours, type sizes, fonts (the design system) | `app/globals.css` (tokens + `text-*` styles), fonts in `app/layout.tsx` |
| Case-study building blocks (section headings, dark highlight boxes, stats card, before/after, "See next project" card) | `components/case-study.tsx` |
| Free-form layouts (About collage, case-study heroes) | `components/Collage.tsx` |
| Images | originals in `design/assets/<page>/`; web versions in `assets/images/` (generated, see below) |
| Resume link (Google Drive) | `resume` in `lib/site.ts` |
| Browser-tab icon | `app/icon.png` |

Type styles: `text-display` (80px headings), `text-title` (48px card titles),
`text-subheading` (40px section headings), `text-subheading-2` (24px serif semibold),
`text-body` (20px serif), `text-label` (24px nav/links), `text-diagram` (12px labels).
Colours: `plum` #320E3B, `sage` #D8DFAF, `lime` #C5D86D, `page` #EAE6F0 (background),
`ink` #3E3E3D, `panel` #FAFAFA. Prefer these over new values. If Amy wants a new
colour or size, ask whether it should apply everywhere or just in this one place.

## 3. Recipes

**Change text.** Edit the words in the page file. Keep typographic quotes (’ “ ”).
In JSX, write a straight apostrophe as `&apos;` or use ’. Keep line breaks (`<br />`)
only where she wants a forced break.

**Change a size, colour or spacing.** Is it one place or the whole site? One place:
change that element's classes. Everywhere: change the token or `text-*` style in
`app/globals.css`, then check every page, since it affects all of them.

**Replace or add an image.**
1. Get the original file. If she gives a path, copy it. If she attached it in chat and
   you can't save attachments, ask her to save it somewhere (e.g. Desktop) and tell you
   the path. With Figma tools connected, you can export a Figma node at 2x yourself.
2. Put the original in `design/assets/<page>/` with a descriptive name.
3. Add or replace its entry in `scripts/optimize-images.mjs` (shared/home) or
   `scripts/image-manifest.mjs` (about, case studies). Use a max width of about 2× the
   width it's shown at.
4. `npm run images`, then point the page's `import` at the new `assets/images/...webp`.
5. Write `alt` text that says what the picture shows. Use `alt=""` only for decorative art.

**Replace an image with a screen recording.** Copy the `.mov` original to
`design/assets/<page>/`, convert it into `public/videos/<page>/<name>.mp4` with
`avconvert -s <in.mov> -p Preset1920x1080 -o <out.mp4>` (macOS built-in), then use
`<FramedVideo src="/videos/<page>/<name>.mp4" label="…" w={…} />` (or pass the URL as a
`BeforeAfter` side's `src`). It loops silently and keeps the screenshots' light frame.

**Contact details / resume.** Email, LinkedIn and resume URL live in `lib/site.ts`.
The resume is a Google Drive share link; to update it, swap the URL in `lib/site.ts`
(or replace the file in Drive and keep the same link).

**Add a case study.**
1. Copy the closest existing folder in `app/work/` to `app/work/<new-slug>/`.
2. Add it to `caseStudies` in `lib/site.ts`; that also puts it in "Selected work".
3. Add a preview image + `previews` entry in `app/page.tsx`.
4. Add the route to `e2e/routes.ts`.
5. Update the "See next project" cards so the case studies link in a loop.

Build pages from `components/case-study.tsx` blocks. Their props take Figma px.

**Reorder or remove a case study.** Change or remove its entry in `caseStudies`. When
removing one, delete its folder and route, and fix the "See next project" links.

**Fix copy typos from the original design.** Known candidates are listed at the end of
`design/extracted/*.md`. Some are baked into images ("Euclidian graph", "feel like
they are in control") and need a re-exported image.

**Undo something already merged.** Open a PR that reverts it:
`git switch main && git pull && git switch -c amy/revert-<thing> && git revert -m 1 <merge-commit-sha>`.
Find the merge commit with `gh pr view <number> --json mergeCommit`.

## 4. Check your work

1. `npm run check` (about a minute). It must pass; don't hand Amy a red PR.
2. Look at it:
   ```bash
   npm run build && (npm run preview &)          # serves the built site on :4173
   node scripts/shoot.mjs /tmp/shots /about/     # full-page PNGs at 1440 and 390 wide
   ```
   Open the PNGs and check the change at both widths, plus anything nearby it could
   have pushed around. For a before/after, shoot `main` first.
   (Full-page shots draw the fixed nav mid-page; that's a capture artifact.)
3. New page → add it to `e2e/routes.ts` so the tests cover it.

## 5. Open the PR

```bash
git add -A && git commit -m "feat(home): make 'Selected work' heading smaller"
git push -u origin HEAD
gh pr create --title "Make the 'Selected work' heading smaller" --body-file <filled template>
node scripts/preview.mjs        # waits for the preview, adds it to the PR, prints it
```

Fill in `.github/pull_request_template.md` and leave its `<!-- preview -->` markers in
place; the script writes the link between them. Keep the "What changed" section to
what Amy will *see*, in her words.

## 6. Report back to Amy

Keep it short:

> Done. The "Selected work" heading is now 48px, the same as the case-study titles.
> **Preview:** https://… (check it on your phone too)
> **PR:** https://github.com/tarikeshaq/amy-portfolio/pull/12
> Tell me what to adjust, or merge the PR on GitHub when you're happy.

**Feedback round.** Commit to the same branch and push, then run `node scripts/preview.mjs`
again. The preview link may change; give her the new one.

**When she says "merge it".** `gh pr merge <number> --merge --delete-branch`, but only
after CI passes (`gh pr checks <number>`). The live site updates 1–2 minutes later;
confirm it with `curl -s https://www.amyazeng.com/... | grep "<new text>"`.

## 7. Troubleshooting

| Symptom | What to do |
|---|---|
| `gh` says not logged in | Ask Amy to run `gh auth login -h github.com -p https -w` (prefix `!` in Claude Code) and authorize in the browser. |
| Push rejected: permission denied | Amy isn't a collaborator yet. Ask her to get Tarik to add her. |
| `npm run check` fails | Read the first error. Lint/type errors point at a file and line. Playwright failures list the page and viewport; `test-results/` has screenshots. Fix it, don't skip it. |
| CI fails on GitHub but passes locally | `gh run view --log-failed`. Usually a file you forgot to commit. |
| `preview.mjs` says Vercel blocked the deployment | Not a code problem. The PR is fine; tell Amy that Tarik needs to check Vercel, and include the message the script printed. See [deployment.md](deployment.md#collaborator-previews). |
| Preview link asks Amy to log in to Vercel | Preview protection is on. Tarik needs to turn it off for previews (see deployment.md). |
| Merge button greyed out | CI hasn't passed yet. Fix the failing check. |
