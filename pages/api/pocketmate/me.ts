import type { NextApiRequest, NextApiResponse } from "next";

import { withSecureApi } from "@/lib/apiSecurity";
import { requireStudent } from "@/lib/auth/pocketSession";
import { getPrisma } from "@/lib/prisma";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const prisma = getPrisma();
  if (!prisma) {
    return res.status(503).json({ error: "Database not configured." });
  }

  const session = await requireStudent(req, res);
  if (!session) return;

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      profile: true,
      _count: {
        select: {
          learnProgress: true,
          badges: true,
          strategies: true,
        },
      },
    },
  });

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  return res.status(200).json({
    id: user.id,
    role: user.role,
    name: user.name,
    email: user.email,
    walletAddress: user.walletAddress,
    profile: user.profile,
    counts: user._count,
  });
}

export default withSecureApi(
  { methods: ["GET"], auditEvent: "pocketmate_me_get" },
  handler
);
