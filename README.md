# PocketMate

**Learn. Trade. Build.** A three-surface DeFi experience for classroom and self-directed practice: structured lessons, a trade workspace with **demo** and **live** modes, and a strategy builder with backtests and saved templates.

Repository: [github.com/kylabuildsthings-oss/pocket_mate](https://github.com/kylabuildsthings-oss/pocket_mate)

## What you can do in the app

| Area          | What it is                                                                                                     |
| ------------- | -------------------------------------------------------------------------------------------------------------- |
| **Learn**     | Curated lessons, glossary-linked terms, quizzes, XP and badges (great for onboarding).                         |
| **Trade**     | Trade flows that respect **demo** vs **live** mode (with an explicit switch and risk acknowledgment for live). |
| **Build**     | Strategy templates, mock backtests, saved strategies, and hooks for future automation workflows.               |
| **Community** | In-app **hub** (`/hub`) for strategy feed, discussion previews, and leaderboards.                              |

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

## License

This project is distributed under the **[MIT License](./LICENSE)**.

The `LICENSE` file retains **Copyright (c) 2023 DefiKids** for the original upstream codebase your work may derive from, and **Copyright (c) 2026 PocketMate contributors** for changes and material contributed to this fork. Keeping both lines is standard for forks: it acknowledges prior authorship and documents who holds rights in newer work. If you need a single copyright holder for your organization, have qualified counsel review—it is not something this README can decide for you.

MIT License — full text in [LICENSE](./LICENSE).
