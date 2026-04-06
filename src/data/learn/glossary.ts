import type { GlossaryTerm } from "@/lib/learn/types";

/**
 * PocketMate glossary — core PocketMate terms plus summaries of common DeFi vocabulary.
 * Many “intro DeFi” entries align with widely used teaching glossaries such as the
 * [FutureLearn / RMIT DeFi course glossary](https://www.futurelearn.com/info/courses/defi-exploring-decentralised-finance-with-blockchain-technologies/0/steps/251892)
 * (summarized here for students, not reproduced verbatim).
 */
export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    id: "defi",
    term: "DeFi",
    short: "Decentralized finance",
    definition:
      "Financial services built on public blockchains using smart contracts instead of traditional banks.",
    category: "basics",
  },
  {
    id: "wallet",
    term: "Wallet",
    short: "Key manager for crypto",
    definition:
      "Software or hardware that stores signing keys and helps you approve transactions. It does not “hold” coins on-device—balances live on-chain.",
    category: "basics",
  },
  {
    id: "blockchain",
    term: "Blockchain",
    short: "Shared ledger",
    definition:
      "A distributed database where transactions are grouped into blocks and linked cryptographically, making history hard to rewrite.",
    category: "basics",
  },
  {
    id: "smart-contract",
    term: "Smart contract",
    short: "Program on-chain",
    definition:
      "Code deployed to a blockchain that runs when users invoke it; defines rules for tokens, swaps, lending, and more.",
    category: "basics",
  },
  {
    id: "token",
    term: "Token",
    short: "On-chain asset record",
    definition:
      "A digital asset represented by a contract standard (e.g. ERC-20). Often transferrable and trackable in a block explorer.",
    category: "assets",
  },
  {
    id: "stablecoin",
    term: "Stablecoin",
    short: "Pegged token",
    definition:
      "A token designed to track a reference price (often $1). Mechanisms and risks vary by issuer and collateral model.",
    category: "assets",
  },
  {
    id: "dex",
    term: "DEX",
    short: "Decentralized exchange",
    definition:
      "A protocol for swapping tokens peer-to-pool using automated market makers or order books on-chain.",
    category: "protocols",
  },
  {
    id: "liquidity-pool",
    term: "Liquidity pool",
    short: "Shared reserves for trading",
    definition:
      "A pooled pair of assets that enables DEX pricing via an algorithm (e.g. constant product). LPs deposit capital and earn fees with impermanent loss risk.",
    category: "protocols",
  },
  {
    id: "staking",
    term: "Staking",
    short: "Locking assets for yield or security",
    definition:
      "Committing tokens to a protocol—often to secure a network or provide liquidity—in exchange for rewards, with slashing or lock-up risks depending on design.",
    category: "protocols",
  },
  {
    id: "impermanent-loss",
    term: "Impermanent loss",
    short: "LP divergence risk",
    definition:
      "Compared with simply holding tokens, providing liquidity can underperform if relative prices move; the loss is “impermanent” until you withdraw.",
    category: "risk",
  },
  {
    id: "rug-pull",
    term: "Rug pull",
    short: "Malicious exit",
    definition:
      "When insiders drain liquidity, pause withdrawals, or upgrade contracts maliciously—common in unaudited or centralized projects.",
    category: "risk",
  },
  {
    id: "demo-mode",
    term: "Demo mode",
    short: "PocketMate simulation",
    definition:
      "A zero-real-funds practice layer in PocketMate using simulated flows so you can learn before touching Mainnet.",
    category: "pocketmate",
  },
  {
    id: "live-mode",
    term: "Live mode",
    short: "Real chain context",
    definition:
      "PocketMate reads real wallet and network context. MVP execution stays simulated unless a flow explicitly sends a transaction—still verify every signature.",
    category: "pocketmate",
  },
  // --- From standard intro DeFi course glossaries (FutureLearn / RMIT-style) ---
  {
    id: "ethereum",
    term: "Ethereum",
    short: "Programmable smart-contract chain",
    definition:
      "A blockchain designed for general-purpose programs (“smart contracts”) and assets beyond a single currency, using its own execution rules and fee market.",
    category: "basics",
  },
  {
    id: "bitcoin",
    term: "Bitcoin",
    short: "First major cryptocurrency",
    definition:
      "The earliest widely adopted cryptocurrency network; its chain primarily records transfers of BTC rather than rich application logic.",
    category: "basics",
  },
  {
    id: "cefi",
    term: "CeFi",
    short: "Centralized crypto finance",
    definition:
      "Centralized crypto businesses—often exchanges or services with legal entity, custody, and local rules—contrasted with fully on-chain DeFi.",
    category: "basics",
  },
  {
    id: "cex",
    term: "CEX",
    short: "Centralized exchange",
    definition:
      "An exchange operated by a company with accounts, custody, and compliance obligations; users trade against the operator’s systems.",
    category: "protocols",
  },
  {
    id: "amm",
    term: "AMM",
    short: "Automated market maker",
    definition:
      "A pooled, algorithmic trading mechanism—often constant-product—where prices emerge from reserves instead of a classic order book.",
    category: "protocols",
  },
  {
    id: "uniswap",
    term: "Uniswap",
    short: "Major Ethereum DEX",
    definition:
      "A well-known decentralized exchange protocol built around AMM pools and liquidity providers on Ethereum and other networks.",
    category: "protocols",
  },
  {
    id: "curve",
    term: "Curve",
    short: "Stablecoin-oriented AMM",
    definition:
      "A DEX family known for efficient swaps among stable assets and correlated pairs using specialized bonding curves.",
    category: "protocols",
  },
  {
    id: "aave",
    term: "Aave",
    short: "Lending protocol",
    definition:
      "An open lending market where users supply assets to earn interest and others borrow against collateral with liquidations if health declines.",
    category: "protocols",
  },
  {
    id: "compound",
    term: "Compound",
    short: "Algorithmic lending",
    definition:
      "A lending protocol where interest rates adjust based on pool utilization; suppliers and borrowers interact via pooled markets.",
    category: "protocols",
  },
  {
    id: "maker-dai",
    term: "Maker / DAI",
    short: "Collateralized stablecoin system",
    definition:
      "A decentralized ecosystem centered on DAI, a crypto-backed stable asset governed by MKR holders and smart-contract rules.",
    category: "protocols",
  },
  {
    id: "erc-20",
    term: "ERC-20",
    short: "Fungible token standard",
    definition:
      "A common Ethereum interface for interchangeable tokens—balances, transfers, and allowances—that most “alt” assets follow.",
    category: "assets",
  },
  {
    id: "dapp",
    term: "dApp",
    short: "Decentralized application",
    definition:
      "An application whose critical logic or state lives on a blockchain or is anchored to it, rather than only on a company server.",
    category: "basics",
  },
  {
    id: "dao",
    term: "DAO",
    short: "On-chain organization",
    definition:
      "Rules and treasuries encoded in contracts; token holders or members typically vote on upgrades, grants, and parameters.",
    category: "protocols",
  },
  {
    id: "arbitrage",
    term: "Arbitrage",
    short: "Price-gap trading",
    definition:
      "Buying and selling the same asset across venues to capture spreads; in crypto it often equalizes prices and carries execution risk.",
    category: "protocols",
  },
  {
    id: "collateral",
    term: "Collateral",
    short: "Backed borrowing",
    definition:
      "Assets pledged so a protocol can lend another asset; if value falls, liquidation or auction may return the system to safety.",
    category: "protocols",
  },
  {
    id: "composability",
    term: "Composability",
    short: "Money legos",
    definition:
      "The ability to plug protocols together—outputs of one become inputs of another—speeding innovation but also coupling risk.",
    category: "protocols",
  },
  {
    id: "flash-loan",
    term: "Flash loan",
    short: "Single-block borrow",
    definition:
      "An atomic loan repaid inside one transaction; used for arbitrage, liquidations, or attacks if logic is flawed—no overnight credit risk for the pool.",
    category: "risk",
  },
  {
    id: "gas-fees",
    term: "Gas fees",
    short: "Network execution cost",
    definition:
      "Fees paid to validators for computation and storage on networks like Ethereum, usually in the native token (e.g. ETH) and priced per unit of gas.",
    category: "basics",
  },
  {
    id: "governance-token",
    term: "Governance token",
    short: "Vote-weighting asset",
    definition:
      "A token conferring voting power over protocol parameters, treasuries, or upgrades—economic and regulatory treatment varies.",
    category: "protocols",
  },
  {
    id: "oracle",
    term: "Oracle",
    short: "External data feed",
    definition:
      "A bridge bringing off-chain or cross-chain facts—prices, events—on-chain for contracts; manipulation and delay are core risks.",
    category: "protocols",
  },
  {
    id: "liquidity-mining",
    term: "Liquidity mining",
    short: "LP incentives",
    definition:
      "Rewarding users who deposit to pools or markets with extra tokens to bootstrap depth—rewards can dilute or end suddenly.",
    category: "protocols",
  },
  {
    id: "tvl",
    term: "TVL",
    short: "Total value locked",
    definition:
      "Approximate dollar value of assets committed to a protocol’s contracts or programs—useful for scale, not a quality score.",
    category: "protocols",
  },
  {
    id: "fiat-money",
    term: "Fiat money",
    short: "Government currency",
    definition:
      "Legal tender backed by state acceptance and policy rather than a commodity peg; contrast with most cryptocurrencies’ rules.",
    category: "basics",
  },
  {
    id: "metamask",
    term: "MetaMask",
    short: "Browser / mobile wallet",
    definition:
      "A popular self-custody wallet for Ethereum-compatible networks; still verify sites, approvals, and network before signing.",
    category: "basics",
  },
  {
    id: "multisig",
    term: "Multisig wallet",
    short: "M-of-N approvals",
    definition:
      "A wallet or module requiring several independent signers for a spend—common for treasuries and DAO operations.",
    category: "basics",
  },
  {
    id: "slippage",
    term: "Slippage",
    short: "Execution vs quote drift",
    definition:
      "Difference between expected and realized trade price from market movement, thin liquidity, or front-running during confirmation.",
    category: "risk",
  },
  {
    id: "leverage",
    term: "Leverage",
    short: "Borrowed size",
    definition:
      "Using borrowed capital or perp multipliers to increase exposure; magnifies both gains and losses including liquidation risk.",
    category: "risk",
  },
  {
    id: "pump-and-dump",
    term: "Pump and dump",
    short: "Hype then dump",
    definition:
      "Coordinated buying to spike price then selling into strength—often illegal in regulated markets; still common in thin tokens.",
    category: "risk",
  },
  {
    id: "hodl",
    term: "HODL",
    short: "Hold through volatility",
    definition:
      "Community slang for long-term holding despite price swings—not a strategy guarantee and not tax or investment advice.",
    category: "basics",
  },
  {
    id: "whale",
    term: "Whale",
    short: "Large holder",
    definition:
      "A participant with enough position size to move markets in thin assets—watch flows and concentration risk.",
    category: "risk",
  },
  {
    id: "agent-economics",
    term: "Agent (economics)",
    short: "Decision-making actor",
    definition:
      "In economics, any participant (person, firm, protocol treasuries) whose choices affect outcomes; DeFi models often treat users and contracts as agents.",
    category: "basics",
  },
];

export const GLOSSARY_CATEGORIES: {
  id: GlossaryTerm["category"];
  label: string;
}[] = [
  { id: "basics", label: "Basics" },
  { id: "assets", label: "Assets" },
  { id: "protocols", label: "Protocols" },
  { id: "risk", label: "Risk" },
  { id: "pocketmate", label: "PocketMate" },
];

export function glossaryById(id: string): GlossaryTerm | undefined {
  return GLOSSARY_TERMS.find((t) => t.id === id);
}
