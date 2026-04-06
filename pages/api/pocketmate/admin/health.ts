import type { NextApiRequest, NextApiResponse } from "next";

import { withSecureApi } from "@/lib/apiSecurity";
import { requireAdmin } from "@/lib/auth/pocketSession";
import { getPrisma } from "@/lib/prisma";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const prisma = getPrisma();
  if (!prisma) {
    return res.status(503).json({ error: "Database not configured." });
  }

  const session = await requireAdmin(req, res);
  if (!session) return;

  const [users, events] = await prisma.$transaction([
    prisma.user.count(),
    prisma.auditEvent.count(),
  ]);

  return res.status(200).json({
    ok: true,
    operator: session.user.id,
    counts: { users, auditEvents: events },
  });
}

export default withSecureApi(
  {
    methods: ["GET"],
    rateLimit: { windowMs: 60_000, max: 30 },
    auditEvent: "pocketmate_admin_health",
  },
  handler
);
