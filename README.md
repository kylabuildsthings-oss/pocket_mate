# PocketMate

**Learn. Trade. Build.** A three-surface DeFi experience for classroom and self-directed practice: structured lessons, a trade workspace with **demo** and **live** modes, and a strategy builder with backtests and saved templates.

Repository: [github.com/kylabuildsthings-oss/pocket_mate](https://github.com/kylabuildsthings-oss/pocket_mate)

## What you can do in the app

| Area          | What it is                                                                                                     |
| ------------- | -------------------------------------------------------------------------------------------------------------- |
| **Learn**     | Curated lessons, glossary-linked terms, quizzes, XP and badges (great for onboarding).                         |
| **Trade**     | Trade flows that respect **demo** vs **live** mode (with an explicit switch and risk acknowledgment for live). |
| **Build**     | Strategy templates, mock backtests, saved strategies, and hooks for future automation workflows.               |
| **Community** | In-app **hub** (`/hub`) for feeds and leaderboards; the older **`/community`** page is optional legacy chrome. |

This README describes what exists in **this** codebase today. Roadmap items belong in **Issues**, not here.

## Tech stack

- **Next.js** (App Router) + **TypeScript**
- **Chakra UI** for many surfaces; PocketMate-specific layout under `app/(pocketmate)/…`
- Wallet / chain integration (e.g. **wagmi**), plus legacy Polygon-oriented contracts where still in use
- **Prisma** for persistence where configured; see `prisma/` and `.env.example`

## Run locally

```bash
npm install
npm run dev
```

The dev server listens on **port 3010** (see `package.json` → `scripts.dev`). Open [http://localhost:3010](http://localhost:3010).

Copy **`.env.example`** → **`.env`** and fill values for your environment before using email, DB, or third-party API features.

## Contributing

Please read **[CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md)** and **[CONTRIBUTING.md](./CONTRIBUTING.md)**.

- **Bugs:** reproducible steps, version, environment; one issue per bug; search existing issues first.
- **Discussion:** GitHub **Issues** and pull requests on this repo (there is no official Discord or separate community server linked from this project).

## Security

See **[SECURITY.md](./SECURITY.md)** for vulnerability reporting (GitHub security advisories preferred).

---

MIT License — see [LICENSE](./LICENSE).
