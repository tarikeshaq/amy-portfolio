# amy-portfolio

Portfolio site for Amy Zeng, AI product designer, live at https://www.amyazeng.com.
A static Next.js site built from her Figma design.

**Amy:** see [docs/for-amy.md](docs/for-amy.md) for how to change the site with an AI agent.

```bash
npm ci && npx playwright install chromium
npm run dev        # http://localhost:3000
npm run check      # lint, typecheck, static build, Playwright (desktop/tablet/mobile)
npm run preview    # serve the static build in out/ on http://localhost:4173
```

- Docs: [`docs/`](docs/README.md) (development guide, ADRs, work log)
- Figma snapshot and per-page outlines: [`design/`](design/README.md)
- Known shortcuts and open questions: [`TECH_DEBT.md`](TECH_DEBT.md)
