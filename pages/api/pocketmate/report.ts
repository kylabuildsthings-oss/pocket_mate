import { withSecureApi } from "@/lib/apiSecurity";
import type { ReportBody } from "@/lib/pocketmate/validation/reportBody";
import { validateReportBody } from "@/lib/pocketmate/validation/reportBody";
import type { NextApiRequest, NextApiResponse } from "next";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ ok: true } | { error: string }>
) {
  const body = req.body as ReportBody;
  console.info(
    "[pm-report]",
    JSON.stringify({
      targetType: body.targetType,
      targetId: body.targetId,
      reasonLen: body.reason?.length ?? 0,
    })
  );
  return res.status(200).json({ ok: true });
}

export default withSecureApi(
  {
    methods: ["POST"],
    rateLimit: { windowMs: 60_000, max: 12 },
    auditEvent: "pocketmate.community.report",
    validateBody: validateReportBody,
  },
  handler
);
