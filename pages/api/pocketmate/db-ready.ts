import type { NextApiRequest, NextApiResponse } from "next";

import { withSecureApi } from "@/lib/apiSecurity";

function handler(_req: NextApiRequest, res: NextApiResponse) {
  const enabled =
    Boolean(process.env.DATABASE_URL?.trim()) &&
    Boolean(process.env.NEXTAUTH_SECRET?.trim());
  return res.status(200).json({ enabled });
}

export default withSecureApi({ methods: ["GET"] }, handler);
