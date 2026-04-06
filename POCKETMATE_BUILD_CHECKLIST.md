# PocketMate Build Checklist (Approval-Gated)

This document is your step-by-step execution plan with explicit approval points and regular localhost review intervals.

How to use:
- Builder completes one step.
- You review at the checkpoint URL.
- You approve/reject that step before moving to the next.

---

## Master Checklist (Start to Finish)

- [ ] 1) Project Setup (Day 0)
  - [x] Create/initialize PocketMate repo in `/Volumes/KYE SSD 2023/POCKETMATE`
  - [x] Import `defikids-dapp` baseline structure and clean unused code
  - [x] Set up branch strategy (`main`, `develop`, feature branches)
  - [x] Add core dependencies (base from defikids: Next, Chakra, wagmi, RainbowKit, viem — Prisma/shadcn in later gates)

Local dev notes (white screen fix):
- Reinstall `viem@0.3.35` and `react-icons` if `node_modules` was incomplete (`mainnet` / missing icon packs).
- Set `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` in `.env.local` for production; dev defaults to RainbowKit placeholder (`YOUR_PROJECT_ID`) with a console warning.
- Use `TMPDIR` on a volume with free space if the system disk is full during `npm install`.

Current checkpoint:
- After `npm run dev`, open `http://localhost:3000` (or the port Next prints if 3000 is busy). You should see the PocketMate “Coming soon” screen, not a blank page.
- Gate 0 passes once the home route renders without compile/runtime errors.

- [ ] 2) Security + Environment Foundation
  - [ ] Create `.env.example` with required keys/placeholders
  - [ ] Ensure `.env*` is ignored in `.gitignore`
  - [ ] Add server-side env validation (`src/lib/env.ts`)
  - [ ] Add secure headers/CSP in config or middleware
  - [ ] Add API input validation and rate limits on write endpoints
  - [ ] Add audit logging for high-risk actions (Live toggle, wallet connect, strategy actions)

- [ ] 3) App Shell + Navigation
  - [ ] Build global layout (sidebar/top nav) aligned to design direction
  - [ ] Add routes: dashboard, learn, trade, build, glossary, community, profile, settings
  - [ ] Implement theme tokens (dark navy + primary/secondary/tertiary accents)
  - [ ] Build reusable UI primitives (cards, badges, stats, table, tabs, modals)

- [ ] 4) Demo/Live Mode Core (Critical Path)
  - [ ] Build global mode store (default = Demo)
  - [ ] Add top-level mode toggle visible app-wide
  - [ ] Add first-time Live warning modal with explicit confirmation
  - [ ] Lock mode switching during in-flight simulated trade actions
  - [ ] Add state labels ("Demo Active", "Live Connected")
  - [ ] Wire mode-aware providers (demo data vs live read-only data)

- [ ] 5) Wallet Integration (Hybrid MVP)
  - [ ] Integrate wagmi/Web3Modal connectors (MetaMask, WalletConnect, Coinbase, etc.)
  - [ ] Enforce Live mode requires connected wallet
  - [ ] Add read-only chain/account/balance in Live mode
  - [ ] Add optional auto-generated demo wallet/profile in Demo mode
  - [ ] Add error states (wrong network, rejected signature, disconnects)

- [ ] 6) Learn Mode (Core Learning Product)
  - [ ] Implement lesson system (10 starter lessons)
  - [ ] Build glossary with search/filter + inline tooltips
  - [ ] Add quizzes with scoring and retry behavior
  - [ ] Store progress state (local first, DB-backed when auth is ready)
  - [ ] Trigger XP/badge/confetti on milestones

- [ ] 7) Gamification System
  - [ ] Implement XP engine (lesson complete, quiz pass, activity events)
  - [ ] Add levels/thresholds/badge unlock rules
  - [ ] Build progress, achievement, and streak UI components
  - [ ] Add celebration event bus/confetti triggers
  - [ ] Add leaderboard scoring model (XP + activity + strategy placeholders)

- [ ] 8) Trade Mode (Hybrid)
  - [ ] Build swap/stake/liquidity screens with clear "simulated execution" labels
  - [ ] Live mode uses real read-only balances + prices
  - [ ] Demo mode uses simulated balances + top-up
  - [ ] Implement simulated execution engine (deterministic output + receipts)
  - [ ] Add transaction-like history (simulated/live-read context)

- [ ] 9) Build Mode (Preview for MVP)
  - [ ] Build strategy editor + template picker
  - [ ] Add mock backtest API + deterministic result cards/charts
  - [ ] Add save/clone/deploy actions as simulated operations
  - [ ] Show metrics (win rate, sharpe, return, drawdown) from mock engine
  - [ ] Add adapter layer for future real `freqtrade` integration

- [ ] 10) Community Lite
  - [ ] Implement strategy feed (list/detail)
  - [ ] Add comments/replies/upvote/downvote with basic moderation constraints
  - [ ] Add public leaderboard (student/university tabs)
  - [ ] Add copy strategy action (simulated)
  - [ ] Add report/abuse endpoint with throttling

- [ ] 11) Data Layer + Auth
  - [ ] Add Prisma schema (users, profiles, progress, badges, strategies, comments, events)
  - [ ] Add Postgres connection + migrations
  - [ ] Add NextAuth or wallet-first auth bridge
  - [ ] Add role-safe API guards (student/admin)
  - [ ] Seed sample data for demos/screenshots

- [ ] 12) QA + Testing
  - [ ] Unit tests for mode store, XP logic, and validators
  - [ ] API tests for write routes and validation failures
  - [ ] E2E tests:
    - [ ] onboarding -> demo mode
    - [ ] demo -> live warning confirm
    - [ ] wallet connect in live mode
    - [ ] lesson completion -> XP/badge
    - [ ] simulated trade + history
  - [ ] Accessibility and responsive checks

- [ ] 13) Performance + Reliability
  - [ ] Optimize image/assets and route loading
  - [ ] Add API caching for read-only price calls
  - [ ] Add loading/error boundaries for key modules
  - [ ] Add logging/monitoring hooks (client + API failures)

- [ ] 14) Launch Readiness
  - [ ] Security pass (no secrets in repo/client bundle)
  - [ ] Production env setup (Vercel/Railway + managed Postgres)
  - [ ] Run migrations + smoke tests in staging
  - [ ] Final design polish against inspo screenshots
  - [ ] Prepare onboarding copy, risk disclaimers, support links

- [ ] 15) Post-MVP (Immediately Next)
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
  - `npm run dev`
- Localhost checks:
  - `http://localhost:3000/` loads app shell
  - `http://localhost:3000/settings` shows mode/security placeholders
- Approval status: `Pending`

### Gate 1 - Shell + Routes Approved?
- Scope: Step 3
- Deliverable:
  - Main navigation and route pages exist with initial layout
- Localhost checks:
  - `http://localhost:3000/dashboard`
  - `http://localhost:3000/learn`
  - `http://localhost:3000/trade`
  - `http://localhost:3000/build`
  - `http://localhost:3000/community`
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
  - Tests pass, performance pass, staging smoke verified, launch-ready checklist done
- Localhost checks:
  - Core E2E happy paths pass locally
  - Error boundaries/loading states render correctly
  - No obvious visual regressions on mobile/desktop
- Approval status: `Pending`

---

## Regular Localhost Review Intervals

Use this as your recurring check cadence while building:

- Every 60-90 minutes:
  - Quick smoke: `http://localhost:3000/`, `/dashboard`, `/trade`
- At each merged feature branch:
  - Full route pass: `/learn`, `/glossary`, `/build`, `/community`, `/settings`
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

- Gate 0: [ ] Approved by: ______  Date: ______
- Gate 1: [ ] Approved by: ______  Date: ______
- Gate 2: [ ] Approved by: ______  Date: ______
- Gate 3: [ ] Approved by: ______  Date: ______
- Gate 4: [ ] Approved by: ______  Date: ______
- Gate 5: [ ] Approved by: ______  Date: ______
- Gate 6: [ ] Approved by: ______  Date: ______
- Gate 7: [ ] Approved by: ______  Date: ______
- Gate 8: [ ] Approved by: ______  Date: ______
