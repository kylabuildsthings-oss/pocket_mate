import type { NextApiRequest, NextApiResponse } from "next";
import type { Session } from "next-auth";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth/authOptions";

export function getPocketSession(req: NextApiRequest, res: NextApiResponse) {
  return getServerSession(req, res, authOptions);
}

/** Returns session or sends 401 and null. */
export async function requireUser(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<Session | null> {
  const session = await getPocketSession(req, res);
  if (!session?.user?.id) {
    res.status(401).json({ error: "Unauthorized" });
    return null;
  }
  return session;
}

/** Student or higher — same as requireUser until more roles exist. */
export async function requireStudent(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return requireUser(req, res);
}

export async function requireAdmin(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<Session | null> {
  const session = await requireUser(req, res);
  if (!session) return null;
  if (session.user.role !== "ADMIN") {
    res.status(403).json({ error: "Admin only" });
    return null;
  }
  return session;
}
