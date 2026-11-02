# Changing your site with an AI agent

You describe the change. The agent edits the site and sends you a **preview link**:
a private copy of your site with the change in it. If you like it, you **merge** and
it goes live on amyazeng.com. Nothing reaches the live site until you merge.

## One-time setup (about 15 minutes, ideally with Tarik)

1. **GitHub.** Make a free account at github.com if you don't have one, and send Tarik
   your username. He'll invite you to the project; accept the email invite.
2. **Claude Code.** Install the Claude desktop app (or Claude Code) and sign in.
3. **Get the project.** Make a new empty folder (e.g. `Documents/amy-portfolio`), open it in
   Claude Code, and say:
   > Set up the amy-portfolio project from GitHub (tarikeshaq/amy-portfolio) so I can make changes. Follow its AGENTS.md.

   It installs what it needs and asks you to sign in to GitHub once: a browser window
   opens and you click **Authorize**.

## Asking for a change

Open Claude Code in the project folder and describe what you want, as you would to a
developer on your team. Examples:

- "On the home page, make *Selected work* smaller, about the size of the case-study titles."
- "Replace my photo at the top of the About page with ~/Desktop/portrait.jpg."
- "Set my email to amy@…, my LinkedIn to linkedin.com/in/…, and use ~/Downloads/resume.pdf as my resume."
- "Fix the typo in the thought-partner case study: 'need to be tested' → 'needs to be tested'."
- "Add a third case study based on this Figma frame: <link>."

Tips:
- Say **which page** and **which part**. A screenshot with a circle on it is perfect
  (drag it into the chat).
- **One change per request** keeps each preview easy to review.
- Give exact text when you have it; the agent copies it word for word.
- If it asks you a question, it's usually "A or B?". Pick one and it carries on.

## Reviewing

When it's done, the agent replies with:
- **Preview:** a link to your site with the change. Check it on your laptop *and* your phone.
- **PR:** the change request on GitHub.

Then either:
- **Ask for tweaks** in the same chat ("a bit bigger", "more space above it"). It updates
  the same PR and gives you a fresh preview link.
- **Merge it.** Open the PR link, click the green **Merge pull request**, then **Confirm
  merge**. Or just tell the agent "merge it". Your live site updates within 1–2 minutes.
- **Drop it.** Click **Close pull request**. The live site is untouched.

## If something's wrong after merging

Tell the agent "undo <the change>". It opens a new PR that reverses it; review and merge as usual.

## When to message Tarik

- The agent says the preview is **blocked**, or the preview asks you to **log in to Vercel**.
- GitHub says you **don't have access**.
- amyazeng.com itself is down.
