import type { Lesson } from "@/lib/learn/types";

export const LESSONS: Lesson[] = [
  {
    id: "l1",
    slug: "what-is-defi",
    title: "What is DeFi?",
    summary:
      "Why programmable money matters—and how it differs from fintech apps.",
    estMinutes: 6,
    order: 1,
    blocks: [
      {
        type: "p",
        segments: [
          {
            kind: "text",
            value: "Decentralized finance (",
          },
          { kind: "term", termId: "defi", label: "DeFi" },
          {
            kind: "text",
            value:
              ") lets people trade, lend, and save using open networks and smart contracts instead of a single bank’s database.",
          },
        ],
      },
      {
        type: "p",
        segments: [
          {
            kind: "text",
            value:
              "You still take real risks—bugs, scams, and volatility—but the rules are transparent on-chain and anyone can build compatible apps.",
          },
        ],
      },
    ],
  },
  {
    id: "l2",
    slug: "wallets-and-keys",
    title: "Wallets & keys",
    summary: "What a wallet really stores and why seed phrases are sacred.",
    estMinutes: 7,
    order: 2,
    blocks: [
      {
        type: "p",
        segments: [
          {
            kind: "text",
            value: "A crypto ",
          },
          { kind: "term", termId: "wallet", label: "wallet" },
          {
            kind: "text",
            value:
              " manages private keys that authorize transactions. Lose the keys (or seed phrase), and funds can be unrecoverable.",
          },
        ],
      },
      {
        type: "list",
        items: [
          "Never share a seed phrase or private key with “support” or websites.",
          "Verify addresses and networks before sending—mistakes are usually irreversible.",
          "Prefer hardware wallets for larger balances after you are comfortable.",
        ],
      },
    ],
  },
  {
    id: "l3",
    slug: "blockchain-basics",
    title: "Blockchain basics",
    summary: "Blocks, nodes, and why history is hard to rewrite.",
    estMinutes: 8,
    order: 3,
    blocks: [
      {
        type: "p",
        segments: [
          { kind: "term", termId: "blockchain", label: "Blockchains" },
          {
            kind: "text",
            value:
              " batch transactions into blocks validators or miners agree on. The linked chain makes old changes expensive to fake.",
          },
        ],
      },
      {
        type: "p",
        segments: [
          {
            kind: "text",
            value:
              "Finality, fees, and speed vary by network—always check which chain your app is using.",
          },
        ],
      },
    ],
  },
  {
    id: "l4",
    slug: "tokens-and-coins",
    title: "Tokens vs coins",
    summary:
      "Native gas assets, ERC-20 style tokens, and what “balance” means.",
    estMinutes: 6,
    order: 4,
    blocks: [
      {
        type: "p",
        segments: [
          {
            kind: "text",
            value: "A native coin pays fees; a ",
          },
          { kind: "term", termId: "token", label: "token" },
          {
            kind: "text",
            value:
              " is often a contract-standard asset (transferable, trackable) living on that same network.",
          },
        ],
      },
    ],
  },
  {
    id: "l5",
    slug: "stablecoins",
    title: "Stablecoins 101",
    summary:
      "Use cases, peg mechanics, and counterparty risk in plain language.",
    estMinutes: 7,
    order: 5,
    blocks: [
      {
        type: "p",
        segments: [
          {
            kind: "text",
            value: "",
          },
          { kind: "term", termId: "stablecoin", label: "Stablecoins" },
          {
            kind: "text",
            value:
              " aim for stable purchasing power—useful for pricing in DeFi—but issuers, reserves, and regulations differ widely.",
          },
        ],
      },
    ],
  },
  {
    id: "l6",
    slug: "dex-intro",
    title: "DEX intro",
    summary:
      "Swaps without a traditional order book—introduction to pooled liquidity.",
    estMinutes: 8,
    order: 6,
    blocks: [
      {
        type: "p",
        segments: [
          { kind: "term", termId: "dex", label: "DEXes" },
          {
            kind: "text",
            value:
              " route trades through smart contracts. Prices come from pool math and fees reward liquidity providers.",
          },
        ],
      },
    ],
  },
  {
    id: "l7",
    slug: "liquidity-pools",
    title: "Liquidity & pools",
    summary: "How pools quote prices and why LPs take divergence risk.",
    estMinutes: 9,
    order: 7,
    blocks: [
      {
        type: "p",
        segments: [
          {
            kind: "text",
            value: "A ",
          },
          { kind: "term", termId: "liquidity-pool", label: "liquidity pool" },
          {
            kind: "text",
            value:
              " holds two tokens and sets a spot price. Large moves can cause ",
          },
          {
            kind: "term",
            termId: "impermanent-loss",
            label: "impermanent loss",
          },
          { kind: "text", value: " versus simply holding." },
        ],
      },
    ],
  },
  {
    id: "l8",
    slug: "staking-basics",
    title: "Staking basics",
    summary: "Rewards, lockups, and protocol-specific risks.",
    estMinutes: 7,
    order: 8,
    blocks: [
      {
        type: "p",
        segments: [
          {
            kind: "text",
            value: "",
          },
          { kind: "term", termId: "staking", label: "Staking" },
          {
            kind: "text",
            value:
              " can mean locking a network’s native asset for yield or security, or depositing into a protocol’s incentives module—read the docs each time.",
          },
        ],
      },
    ],
  },
  {
    id: "l9",
    slug: "risk-and-scams",
    title: "Risk & scams",
    summary: "Phishing, approvals, and how to sanity-check a protocol.",
    estMinutes: 10,
    order: 9,
    blocks: [
      {
        type: "p",
        segments: [
          {
            kind: "text",
            value:
              "Watch for fake airdrops, copied websites, and unlimited token approvals. ",
          },
          { kind: "term", termId: "rug-pull", label: "Rug pulls" },
          {
            kind: "text",
            value:
              " remain common when teams are anonymous and liquidity is thin.",
          },
        ],
      },
      {
        type: "list",
        items: [
          "Bookmark official sites; ignore DMs promising returns.",
          "Revoke suspicious allowances with a trusted tool when needed.",
          "Start small while learning; use Demo mode to rehearse flows first.",
        ],
      },
    ],
  },
  {
    id: "l10",
    slug: "pocketmate-demo-live",
    title: "PocketMate Demo vs Live",
    summary: "How PocketMate separates practice flows from real chain context.",
    estMinutes: 5,
    order: 10,
    blocks: [
      {
        type: "p",
        segments: [
          {
            kind: "text",
            value: "",
          },
          { kind: "term", termId: "demo-mode", label: "Demo mode" },
          {
            kind: "text",
            value: " gives you a safe simulator; ",
          },
          { kind: "term", termId: "live-mode", label: "Live mode" },
          {
            kind: "text",
            value:
              " connects your wallet for read-only context. You will still confirm wallet risks before toggling.",
          },
        ],
      },
    ],
  },
];

export function lessonBySlug(slug: string): Lesson | undefined {
  return LESSONS.find((l) => l.slug === slug);
}

export function lessonById(id: string): Lesson | undefined {
  return LESSONS.find((l) => l.id === id);
}
