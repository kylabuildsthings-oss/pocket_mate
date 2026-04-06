import type { LessonQuiz } from "@/lib/learn/types";

export const LESSON_QUIZZES: LessonQuiz[] = [
  {
    lessonId: "l1",
    passPct: 67,
    xpReward: 25,
    questions: [
      {
        id: "l1q1",
        prompt: "What best describes DeFi compared to a traditional bank app?",
        choices: [
          "A single company’s private database",
          "Open protocols on public networks with smart contracts",
          "Only central-bank issued CBDCs",
          "Offline spreadsheets shared by email",
        ],
        correctIndex: 1,
      },
      {
        id: "l1q2",
        prompt: "Why do people say DeFi rules can be more transparent?",
        choices: [
          "Banks publish all salaries publicly",
          "Smart-contract logic and transactions can be inspected on-chain",
          "There is no cryptography involved",
          "Validators manually email you each change",
        ],
        correctIndex: 1,
      },
      {
        id: "l1q3",
        prompt: "Which risk is still real in DeFi?",
        choices: [
          "Only inflation risk",
          "No user responsibility after connecting a wallet",
          "Smart-contract bugs, scams, and volatility",
          "Guaranteed FDIC coverage on all tokens",
        ],
        correctIndex: 2,
      },
    ],
  },
  {
    lessonId: "l2",
    passPct: 67,
    xpReward: 25,
    questions: [
      {
        id: "l2q1",
        prompt: "What does a non-custodial wallet primarily protect?",
        choices: [
          "The exchange’s revenue",
          "Private keys / signing authority under your control",
          "Your social media passwords",
          "Stock brokerage margin",
        ],
        correctIndex: 1,
      },
      {
        id: "l2q2",
        prompt: "Who should you share a seed phrase with?",
        choices: [
          "Official support via DM",
          "Nobody you do not intend to give full fund access",
          "Your university IT desk",
          "The PocketMate app automatically",
        ],
        correctIndex: 1,
      },
      {
        id: "l2q3",
        prompt:
          "If you send tokens to the wrong address on the wrong network, what is typical?",
        choices: [
          "Automatic refund within 24 hours",
          "The transaction is usually irreversible",
          "A bank can reverse it",
          "Validators undo it for a $5 fee",
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    lessonId: "l3",
    passPct: 67,
    xpReward: 30,
    questions: [
      {
        id: "l3q1",
        prompt: "Blocks in a blockchain are linked so that:",
        choices: [
          "Browsers load faster",
          "Changing old history becomes computationally expensive",
          "NFT images are stored inside blocks uncompressed",
          "Gas is always free",
        ],
        correctIndex: 1,
      },
      {
        id: "l3q2",
        prompt: "Fees and speed vary mostly because:",
        choices: [
          "Design and network congestion differ by chain",
          "All chains charge exactly $0.01",
          "Wallets choose random numbers",
          "Banks set Ethereum gas",
        ],
        correctIndex: 0,
      },
      {
        id: "l3q3",
        prompt: "Validators or miners generally:",
        choices: [
          "Print paper banknotes",
          "Help reach consensus on the next block",
          "Store your seed phrase in the cloud",
          "Guarantee token prices",
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    lessonId: "l4",
    passPct: 67,
    xpReward: 25,
    questions: [
      {
        id: "l4q1",
        prompt:
          "Compared with a native gas coin, an ERC-20 style token usually:",
        choices: [
          "Pays network fees by default without holding the native coin",
          "Is implemented as contract logic you can transfer",
          "Cannot be viewed in a block explorer",
          "Only exists on Bitcoin Layer 1",
        ],
        correctIndex: 1,
      },
      {
        id: "l4q2",
        prompt: "Your “balance” on-chain means:",
        choices: [
          "Cash in a bank vault with your name",
          "What the ledger records for your addresses/contracts",
          "CPU RAM used by your laptop",
          "Free storage on Google Drive",
        ],
        correctIndex: 1,
      },
      {
        id: "l4q3",
        prompt:
          "Sending tokens to a contract address without following its deposit flow can:",
        choices: [
          "Always auto-wrap to ETH",
          "Sometimes result in stuck or lost funds",
          "Be undone by Visa chargeback",
          "Increase your credit score",
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    lessonId: "l5",
    passPct: 67,
    xpReward: 25,
    questions: [
      {
        id: "l5q1",
        prompt: "Stablecoins attempt to:",
        choices: [
          "Double in price every week",
          "Track a stable reference like $1",
          "Replace all art with JPEGs",
          "Hide all transactions",
        ],
        correctIndex: 1,
      },
      {
        id: "l5q2",
        prompt: "A major stablecoin risk to study is:",
        choices: [
          "Issuer / reserve and regulatory model",
          "Guaranteed 20% daily yield",
          "Mandatory KYC for reading Wikipedia",
          "Free unlimited withdrawals from any ATM",
        ],
        correctIndex: 0,
      },
      {
        id: "l5q3",
        prompt: "Using stablecoins in DeFi still requires:",
        choices: [
          "No smart-contract or bridge risk",
          "Reading disclosures and protocol risks",
          "A traditional brokerage account only",
          "Mining Bitcoin on a phone",
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    lessonId: "l6",
    passPct: 67,
    xpReward: 30,
    questions: [
      {
        id: "l6q1",
        prompt: "A DEX swap is typically settled by:",
        choices: [
          "A broker’s matching engine off-chain only",
          "Smart contracts moving tokens according to pool rules",
          "Paper certificates mailed to your house",
          "SMS codes to your bank",
        ],
        correctIndex: 1,
      },
      {
        id: "l6q2",
        prompt: "Slippage settings matter because:",
        choices: [
          "They cap how much price can move before your trade aborts",
          "They remove all fees",
          "They freeze the Federal Reserve",
          "They disable block explorers",
        ],
        correctIndex: 0,
      },
      {
        id: "l6q3",
        prompt: "Route quality can differ by:",
        choices: [
          "Liquidity depth and path across pools",
          "Your shoe size",
          "Whether you use Wi‑Fi vs Ethernet color",
          "Day of week only",
        ],
        correctIndex: 0,
      },
    ],
  },
  {
    lessonId: "l7",
    passPct: 67,
    xpReward: 35,
    questions: [
      {
        id: "l7q1",
        prompt: "Impermanent loss is primarily:",
        choices: [
          "A tax refund",
          "Underperformance vs holding due to relative price moves in a pool",
          "Loss of Wi-Fi signal",
          "When a block explorer is offline",
        ],
        correctIndex: 1,
      },
      {
        id: "l7q2",
        prompt: "Providing liquidity earns fees but:",
        choices: [
          "Guarantees beating every centralized exchange",
          "Still exposes you to pool-specific risks",
          "Eliminates all hacks",
          "Removes smart-contract code from chain",
        ],
        correctIndex: 1,
      },
      {
        id: "l7q3",
        prompt: "Two-token AMM pools price assets using:",
        choices: [
          "A fixed oracle chosen by your bank",
          "Reserves and an invariant (e.g. constant product)",
          "Random giveaways on social media",
          "The user’s GPS coordinates",
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    lessonId: "l8",
    passPct: 67,
    xpReward: 30,
    questions: [
      {
        id: "l8q1",
        prompt: "Staking rewards often come from:",
        choices: [
          "Inflation, fees, or protocol incentives—read each design",
          "A law requiring 8% APR",
          "Magic internet money with no economics",
          "Stock dividends automatically",
        ],
        correctIndex: 0,
      },
      {
        id: "l8q2",
        prompt: "Lock-ups or unbonding periods mean:",
        choices: [
          "Funds may not be instant liquidity",
          "Gas is always $0",
          "You cannot read documentation",
          "The chain stops forever",
        ],
        correctIndex: 0,
      },
      {
        id: "l8q3",
        prompt: "Before staking a new token you should:",
        choices: [
          "Verify contract addresses and slash conditions if any",
          "Send funds to the first Google ad",
          "Ignore tokenomics PDFs",
          "Trust any Telegram admin",
        ],
        correctIndex: 0,
      },
    ],
  },
  {
    lessonId: "l9",
    passPct: 67,
    xpReward: 35,
    questions: [
      {
        id: "l9q1",
        prompt: "A common phishing pattern is:",
        choices: [
          "Bookmarking official sites",
          "Urgent DMs asking you to “verify” your seed phrase",
          "Reading audited reports",
          "Small test transactions",
        ],
        correctIndex: 1,
      },
      {
        id: "l9q2",
        prompt: "Unlimited token approvals can:",
        choices: [
          "Let a malicious contract drain approved tokens if compromised",
          "Guarantee your tokens are insured",
          "Only be set on Christmas",
          "Disable all swaps",
        ],
        correctIndex: 0,
      },
      {
        id: "l9q3",
        prompt: "A rug pull often involves:",
        choices: [
          "Transparent multisig upgrades only",
          "Malicious liquidity removal or privileged controls",
          "Open-sourcing all code forever",
          "Publishing all team home addresses",
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    lessonId: "l10",
    passPct: 67,
    xpReward: 40,
    questions: [
      {
        id: "l10q1",
        prompt: "PocketMate Demo mode is meant to:",
        choices: [
          "Replace tax advisors",
          "Let you practice without real funds at risk in-app",
          "Automatically invest your salary",
          "Bypass university Wi-Fi blocks only",
        ],
        correctIndex: 1,
      },
      {
        id: "l10q2",
        prompt: "In Live mode you should still:",
        choices: [
          "Assume every button sends Mainnet transactions without reading prompts",
          "Read wallet prompts and verify sites/contracts",
          "Paste seed phrases into PocketMate chat",
          "Disable 2FA everywhere",
        ],
        correctIndex: 1,
      },
      {
        id: "l10q3",
        prompt: "Why confirm a risk modal the first time you go Live?",
        choices: [
          "So the app can store your seed phrase",
          "To acknowledge real fees and responsibilities before real context loads",
          "It is decorative with no meaning",
          "It unlocks hidden leverage only",
        ],
        correctIndex: 1,
      },
    ],
  },
];

export function quizForLesson(lessonId: string) {
  return LESSON_QUIZZES.find((q) => q.lessonId === lessonId);
}
