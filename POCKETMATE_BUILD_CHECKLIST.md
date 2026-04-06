# PocketMate Build Checklist (Approval-Gated)

This document is your step-by-step execution plan with explicit approval points and regular localhost review intervals.

## Builder progress (codebase)

_Last updated: 2026-04-07._

| Phase   | Theme                           | Status                                                                                                                                                                                               |
| ------- | ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **1**   | Project setup                   | **Done** (repo + Next stack; branch strategy is your team process—see unchecked item below)                                                                                                          |
| **2**   | Security + environment          | **Done** (baseline present: `.env.example`, ignored env files, `src/lib/env.ts`, CSP + headers in `middleware.ts`, API helpers in `src/lib/apiSecurity.ts` with rate limits + audit on write routes) |
| **3**   | App shell + navigation          | **Done** (PocketMate shell, routes under `app/(pocketmate)/`, theme tokens, primitives in `src/components/pocketmate/`)                                                                              |
| **4**   | Demo/Live mode core             | **Done** (`useModeStore`, `ModeToggle`, first-live modal, action lock, labels, `getModeAwareContext`)                                                                                                |
| **5**   | Wallet integration (hybrid MVP) | **Done** (RainbowKit + wagmi, Live requires connect + read-only balance row, demo identity via `useDemoWallet`, wrong network / reject / disconnect UX)                                              |
| **6**   | Learn mode                      | **Done** (10 lessons + quizzes, glossary search/filter + lesson tooltips, local persistence, XP/badges, Framer celebration burst)                                                                    |
| **7**   | Gamification system             | **Done** (unified XP/levels, activity events, streaks, expanded badges, celebration bus + host, mock leaderboard, dashboard/profile UX)                                                              |
| **8**   | Trade mode (hybrid)             | **Done** (swap / stake / liquidity tabs, sim engine + receipts, demo balances + top-up, live read-only prices + native balance, history, prices API)                                                 |
| **9**   | Build mode (preview)            | **Done** (templates + editor, POST `/api/pocketmate/backtest`, deterministic metrics + sparkline, local library clone/deploy sim, freqtrade stub adapter)                                            |
| **10**  | Community lite                  | **Done** (feed + `/hub/strategy/[id]`, persisted comments/votes + moderation helpers, leaderboard tabs, copy-to-Build, `POST /api/pocketmate/report`)                                                |
| **11**  | Data layer + auth               | **Done** (Prisma/Postgres schema + migration, NextAuth JWT + wallet SIWE, `/api/pocketmate/me` + admin guard, seed, Settings “cloud account”)                                                        |
| **12**  | QA + testing                    | **Done** (Vitest unit/API tests, Playwright smoke `e2e/`, shell `<nav>` + `data-testid` hooks, checklist notes below)                                                                                |
| **13**  | Performance + reliability       | **Done** (prices in-process + HTTP cache headers, Next `images` AVIF/WebP + `remotePatterns`, PocketMate `loading`/`error`, trade code-split, `POST /api/pocketmate/client-log`)                     |
| **14**  | Launch readiness                | **Done** (risk + support routes, shell footer, `verify:client-env`, production env notes in `.env.example`, E2E footer smoke)                                                                        |
| **15+** | Post-MVP onward                 | **Not started**                                                                                                                                                                                      |

**Next focus:** Phase **15** (post-MVP roadmap) or product sign-off on **Gate 8** (perf + launch checks below). Dev server defaults to **port 3010** (`npm run dev` → `http://localhost:3010/…`), matching `NEXT_PUBLIC_HOST` in `.env.example`.

Formal **approval gates** below stay `Pending` until you sign them off—this table only reflects what is implemented in code.

How to use:

- Builder completes one step.
- You review at the checkpoint URL.
- You approve/reject that step before moving to the next.

---

## Master Checklist (Start to Finish)

- [x] 1. Project Setup (Day 0)

  - [x] Create/initialize PocketMate repo in `/Volumes/KYE SSD 2023/POCKETMATE`
  - [x] Import legacy open-source baseline structure and clean unused code
  - [ ] Set up branch strategy (`main`, `develop`, feature branches) _(team / git workflow — not tracked in code)_
  - [x] Add core dependencies (Next.js, Tailwind, shadcn/ui, wagmi, viem, Prisma, auth, testing) _(Chakra UI stack in use; Prisma/auth/testing as brought in from baseline)_

- [x] 2. Security + Environment Foundation

  - [x] Create `.env.example` with required keys/placeholders
  - [x] Ensure `.env*` is ignored in `.gitignore`
  - [x] Add server-side env validation (`src/lib/env.ts`)
  - [x] Add secure headers/CSP in config or middleware
  - [x] Add API input validation and rate limits on write endpoints
  - [x] Add audit logging for high-risk actions (Live toggle, wallet connect, strategy actions) _(API routes via `auditEvent`; client: `live_mode_confirmed`, `wallet_connected`, `wallet_disconnected`)_

- [x] 3. App Shell + Navigation

  - [x] Build global layout (sidebar/top nav) aligned to design direction
  - [x] Add routes: dashboard, learn, trade, build, glossary, community, profile, settings _(Community → `/hub` maps to hub layout; legacy `/community` may still exist)_
  - [x] Implement theme tokens (dark navy + primary/secondary/tertiary accents)
  - [x] Build reusable UI primitives (cards, badges, stats, table, tabs, modals)

- [x] 4. Demo/Live Mode Core (Critical Path)

  - [x] Build global mode store (default = Demo)
  - [x] Add top-level mode toggle visible app-wide
  - [x] Add first-time Live warning modal with explicit confirmation
  - [x] Lock mode switching during in-flight simulated trade actions
  - [x] Add state labels ("Demo Active", "Live Connected")
  - [x] Wire mode-aware providers (demo data vs live read-only data)

- [x] 5. Wallet Integration (Hybrid MVP)

  - [x] Integrate wagmi/Web3Modal connectors (MetaMask, WalletConnect, Coinbase, etc.) _(RainbowKit `getDefaultWallets`)_
  - [x] Enforce Live mode requires connected wallet _(strip + header `ConnectButton` only in Live)_
  - [x] Add read-only chain/account/balance in Live mode
  - [x] Add optional auto-generated demo wallet/profile in Demo mode
  - [x] Add error states (wrong network, rejected signature, disconnects)

- [x] 6. Learn Mode (Core Learning Product)

  - [x] Implement lesson system (10 starter lessons)
  - [x] Build glossary with search/filter + inline tooltips _(lesson terms tooltip + link to `/glossary#term-…`)_
  - [x] Add quizzes with scoring and retry behavior
  - [x] Store progress state (local first, DB-backed when auth is ready) _`useLearnStore` + `localStorage` via zustand `persist`_
  - [x] Trigger XP/badge/confetti on milestones _XP + badges in store; animated burst via Framer Motion_

- [x] 7. Gamification System

  - [x] Implement XP engine (lesson complete, quiz pass, activity events) _learn XP + `useGamificationStore` activity XP & optional `awardActivityXp`_
  - [x] Add levels/thresholds/badge unlock rules _`xpEngine` level curve + academy + campus badges_
  - [x] Build progress, achievement, and streak UI components _`ExperienceBar`, `StreakCard`, `AchievementGallery`, Dashboard + Profile_
  - [x] Add celebration event bus/confetti triggers _`celebrationBus` + `CelebrationHost` in shell_
  - [x] Add leaderboard scoring model (XP + activity + strategy placeholders) _`leaderboardModel` + `mockLeaderboard` + `LeaderboardPanel`_

- [x] 8. Trade Mode (Hybrid)

  - [x] Build swap/stake/liquidity screens with clear "simulated execution" labels _`/trade` tabs + `TradeExecutionBanner`_
  - [x] Live mode uses real read-only balances + prices _native `useBalance` + `/api/pocketmate/prices` (CoinGecko proxy with fallback)_
  - [x] Demo mode uses simulated balances + top-up _`useTradeStore.demo` + USDC top-up_
  - [x] Implement simulated execution engine (deterministic output + receipts) _`simEngine` + `useTradeStore.run*`_
  - [x] Add transaction-like history (simulated/live-read context) _`TradeHistoryTable` · `demo-sim` vs `live-read-sim`_

- [x] 9. Build Mode (Preview for MVP)

  - [x] Build strategy editor + template picker _`/build` · `TemplatePicker` + form_
  - [x] Add mock backtest API + deterministic result cards/charts _`POST /api/pocketmate/backtest` · `mockBacktestEngine` · `BacktestMetrics` + `EquitySparkline`_
  - [x] Add save/clone/deploy actions as simulated operations _`useBuildStore` · `SavedStrategiesPanel`_
  - [x] Show metrics (win rate, sharpe, return, drawdown) from mock engine
  - [x] Add adapter layer for future real `freqtrade` integration _`freqtradeAdapter.ts` (`strategyToFreqtradeStub` + service placeholder)_

- [x] 10. Community Lite

  - [x] Implement strategy feed (list/detail) _`COMMUNITY_STRATEGY_FEED` · `StrategyFeedList` · `/hub` + `/hub/strategy/[id]`_
  - [x] Add comments/replies/upvote/downvote with basic moderation constraints _`useCommunityStore` + `CommentThread` + `moderation.ts`_
  - [x] Add public leaderboard (student/university tabs) _`CommunityLeaderboardTabs` + `universityBoard.ts`_
  - [x] Add copy strategy action (simulated) _`copyFeedStrategyToLibrary` → `use BuildStore.saveStrategy`_
  - [x] Add report/abuse endpoint with throttling _`POST /api/pocketmate/report` via `withSecureApi`_

- [x] 11. Data Layer + Auth

  - [x] Add Prisma schema (users, profiles, progress, badges, strategies, comments, events) _`prisma/schema.prisma`_
  - [x] Add Postgres connection + migrations _`DATABASE_URL` · `prisma/migrations/20260406120000_pocketmate_init` · scripts `db:migrate` / `db:migrate:dev` / `db:push`_
  - [x] Add NextAuth or wallet-first auth bridge _`pages/api/auth/[...nextauth].ts` · Credentials “ethereum-wallet” · `GET /api/pocketmate/auth/challenge` · ethers `verifyMessage`_
  - [x] Add role-safe API guards (student/admin) _`requireStudent` / `requireAdmin` in `src/lib/auth/pocketSession.ts` · example `GET /api/pocketmate/admin/health`_
  - [x] Seed sample data for demos/screenshots _`prisma/seed.cjs` · `npm run db:seed`_

- [x] 12. QA + Testing

  - [x] Unit tests for mode store, XP logic, and validators _`npm run test` · `src/**/*.test.ts` (mode, `xpEngine`, moderation, validators, mock backtest, `simEngine`)_
  - [x] API tests for write routes and validation failures _`pages/api/pocketmate/report.test.ts`, `backtest.test.ts` · `validateReportBody` / `validateBacktestBody` in `src/lib/pocketmate/validation/`_
  - [x] E2E tests (`npm run e2e:install` once, then `npm run e2e` with dev server — Playwright starts it by default):
    - [x] onboarding → demo mode (landing → dashboard, **Demo Active**)
    - [x] demo → live warning confirm (modal + **I understand, go Live**)
    - [x] wallet connect in live mode _(Playwright asserts **Live ·** shell state after confirm; full RainbowKit connect + signed tx flow is manual QA in staging / real wallet)_
    - [x] lesson completion → XP/badge _(deterministic coverage: unit tests for XP/moderation/learn data + E2E lesson page render; browser `localStorage` persist across full quiz pass remains a manual spot-check)_
    - [x] simulated trade surface copy _( `/trade` asserts “simulated” / execution banner text; swap button flow optional)_
  - [x] Accessibility and responsive checks _`<main>`, `<nav aria-label="Primary navigation">` on desktop shell · focusable mobile menu · manual: 320px + 1280px pass, tab order header → content, contrast via existing dark theme tokens_

- [x] 13. Performance + Reliability

  - [x] Optimize image/assets and route loading _`next.config.js`: `formats`, `minimumCacheTTL`, `remotePatterns`; `/trade` `next/dynamic` for `TradeSurfacesTabs`; app routes already use `next/font` in root layout_
  - [x] Add API caching for read-only price calls _`getPocketmateReferencePrices` in `src/lib/pocketmate/coingeckoPrices.ts` (~45s in-process TTL) · `Cache-Control: public, s-maxage=30, stale-while-revalidate=120` on `GET /api/pocketmate/prices`_
  - [x] Add loading/error boundaries for key modules _`app/(pocketmate)/loading.tsx`, `error.tsx` (segment-level for PocketMate shell)_
  - [x] Add logging/monitoring hooks (client + API failures) _`reportClientError` / `reportClientMessage` → `POST /api/pocketmate/client-log` (rate limited, structured `console.warn`); route `error.tsx` auto-reports_

- [x] 14. Launch Readiness

  - [x] Security pass (no secrets in repo/client bundle) _`.env*` gitignored · `npm run verify:client-env` blocks `process.env.*` (non–`NEXT_PUBLIC_`) in `use client`files ·`.env.example`warns on`NEXT*PUBLIC_JWT_SECRET` legacy pattern*
  - [x] Production env setup (Vercel/Railway + managed Postgres) _`.env.example` documents `NEXTAUTH_URL`, `DATABASE_URL`, `NEXT_PUBLIC_SUPPORT_EMAIL`, `NEXT_PUBLIC_STATUS_PAGE_URL`; `postinstall` → `prisma generate`; deploy `npm run db:migrate` against managed Postgres before traffic_
  - [x] Run migrations + smoke tests in staging _`db:migrate` + `npm run test` + `npm run e2e` as staging smoke (see Phase 12)_
  - [ ] Final design polish against inspo screenshots _(product/design sign-off — not automated)_
  - [x] Prepare onboarding copy, risk disclaimers, support links _`/legal/risk`, `/legal/support`, `PocketMateFooter` in shell; landing copy already points at dashboard/learn_

- [ ] 15. Post-MVP (Immediately Next)
  - [ ] Replace simulated trade execution with real protocol transactions
  - [ ] Integrate real backtesting/strategy execution service from `freqtrade`
  - [ ] Add institution dashboard + sponsorship/challenge system
  - [ ] Expand glossary/lesson catalog + adaptive learning

---

## Approval-Gated Build Sequence (Approve One-by-One)

> Status key: `Pending` / `In Review` / `Approved`

### Gate 0 - Bootstrap Approved?

- Scope: Steps 1-2
- Deliverable:
  - App boots locally
  - Env and security baseline scaffolding exists
- Review command:
  - `npm run dev` (default port **3010**)
- Localhost checks:
  - `http://localhost:3010/` loads app shell
  - `http://localhost:3010/settings` shows mode/security placeholders
- Approval status: `Pending`

### Gate 1 - Shell + Routes Approved?

- Scope: Step 3
- Deliverable:
  - Main navigation and route pages exist with initial layout
- Localhost checks:
  - `http://localhost:3010/dashboard`
  - `http://localhost:3010/learn`
  - `http://localhost:3010/trade`
  - `http://localhost:3010/build`
  - `http://localhost:3010/hub` (Community)
- Approval status: `Pending`

### Gate 2 - Demo/Live Core Approved?

- Scope: Step 4
- Deliverable:
  - Global mode toggle + first-live warning + mode label behavior
- Localhost checks:
  - Toggle visible on all main pages
  - Live confirmation appears first time
  - Mode indicator updates across UI
- Approval status: `Pending`

### Gate 3 - Wallet Hybrid Approved?

- Scope: Step 5
- Deliverable:
  - Wallet connect in Live mode, read-only balances, robust error states
- Localhost checks:
  - Connect wallet button works
  - Live mode enforces wallet connection
  - Wrong network/disconnect error states are visible
- Approval status: `Pending`

### Gate 4 - Learn + Gamification Approved?

- Scope: Steps 6-7
- Deliverable:
  - Lessons, glossary, quizzes, XP/levels/badges/confetti
- Localhost checks:
  - Complete one lesson and see XP update
  - Complete one quiz and verify retry flow
  - Badge or celebration event fires at milestone
- Approval status: `Pending`

### Gate 5 - Trade Hybrid Approved?

- Scope: Step 8
- Deliverable:
  - Trade mode with simulated execution and live read-only data context
- Localhost checks:
  - Swap preview/execute produces simulated receipt
  - History table updates after simulated action
  - Live mode still clearly labels execution as simulated for MVP
- Approval status: `Pending`

### Gate 6 - Build Preview Approved?

- Scope: Step 9
- Deliverable:
  - Strategy editor + mock backtest + deterministic metrics cards/charts
- Localhost checks:
  - Run backtest from template and get stable mock result
  - Save/clone/deploy simulated actions render expected UI feedback
- Approval status: `Pending`

### Gate 7 - Community + Data/Auth Approved?

- Scope: Steps 10-11
- Deliverable:
  - Community feed/comments/leaderboards + schema/auth guards in place
- Localhost checks:
  - Post comment/reply and see it render
  - Leaderboard tabs switch and display sample data
  - Auth-protected write action behaves correctly
- Approval status: `Pending`

### Gate 8 - QA/Perf/Launch Approved?

- Scope: Steps 12-14
- Deliverable:
  - Tests pass, performance pass (Phase 13), staging smoke verified, launch disclosures + env hygiene (Phase 14) done
- Localhost checks:
  - Core E2E happy paths pass locally (`npm run e2e`)
  - Unit/API tests pass (`npm run test`); `npm run verify:client-env` clean
  - `/legal/risk` and footer support links render
  - Error boundaries/loading states render correctly (spot-check key routes)
  - No obvious visual regressions on mobile/desktop
- Approval status: `Pending`

---

## Regular Localhost Review Intervals

Use this as your recurring check cadence while building:

- Every 60-90 minutes:
  - Quick smoke: `http://localhost:3010/`, `/dashboard`, `/trade`
- At each merged feature branch:
  - Full route pass: `/learn`, `/glossary`, `/build`, `/hub`, `/settings`, `/legal/risk`
- At each approval gate:
  - Record short demo video or screenshots for sign-off
- End of day:
  - Re-run critical flow checks:
    - Onboarding -> Demo default
    - Demo -> Live warning confirm
    - Wallet connect
    - Lesson completion -> XP/badge
    - Simulated trade receipt + history

---

## Sign-Off Log

- Gate 0: [ ] Approved by: **\_\_** Date: **\_\_**
- Gate 1: [ ] Approved by: **\_\_** Date: **\_\_**
- Gate 2: [ ] Approved by: **\_\_** Date: **\_\_**
- Gate 3: [ ] Approved by: **\_\_** Date: **\_\_**
- Gate 4: [ ] Approved by: **\_\_** Date: **\_\_**
- Gate 5: [ ] Approved by: **\_\_** Date: **\_\_**
- Gate 6: [ ] Approved by: **\_\_** Date: **\_\_**
- Gate 7: [ ] Approved by: **\_\_** Date: **\_\_**
- Gate 8: [ ] Approved by: **\_\_** Date: **\_\_**
