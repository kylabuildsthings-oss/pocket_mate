import { randomBytes } from "crypto";
import type { NextApiRequest, NextApiResponse } from "next";
import { getAddress } from "ethers";

import { withSecureApi } from "@/lib/apiSecurity";
import { getPrisma } from "@/lib/prisma";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const prisma = getPrisma();
  if (!prisma) {
    return res
      .status(503)
      .json({ error: "Database not configured (set DATABASE_URL)." });
  }

  const raw = typeof req.query.address === "string" ? req.query.address : "";
  if (!raw.trim()) {
    return res.status(400).json({ error: "Missing address query parameter" });
  }

  let address: string;
  try {
    address = getAddress(raw);
  } catch {
    return res.status(400).json({ error: "Invalid Ethereum address" });
  }

  const nonce = randomBytes(16).toString("hex");
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

  await prisma.authNonce.create({
    data: {
      address: address.toLowerCase(),
      nonce,
      expiresAt,
    },
  });

  const message = [
    "PocketMate — sign in with Ethereum",
    "",
    `Wallet: ${address}`,
    `Nonce: ${nonce}`,
    `Issued (UTC): ${new Date().toISOString()}`,
  ].join("\n");

  return res.status(200).json({
    message,
    expiresAt: expiresAt.toISOString(),
  });
}

export default withSecureApi(
  {
    methods: ["GET"],
    rateLimit: { windowMs: 60_000, max: 40 },
    auditEvent: "pocketmate_auth_challenge",
  },
  handler
);
