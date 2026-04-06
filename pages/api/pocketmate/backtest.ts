import { runMockBacktest } from "@/lib/build/mockBacktestEngine";
import type { BacktestRequest, BacktestResult } from "@/lib/build/types";
import { validateBacktestBody } from "@/lib/pocketmate/validation/backtestBody";
import { withSecureApi } from "@/lib/apiSecurity";
import type { NextApiRequest, NextApiResponse } from "next";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<BacktestResult | { error: string }>
) {
  const input = req.body as BacktestRequest;
  const result = runMockBacktest(input);
  return res.status(200).json(result);
}

export default withSecureApi(
  {
    methods: ["POST"],
    rateLimit: { windowMs: 60_000, max: 45 },
    auditEvent: "pocketmate.backtest.run",
    validateBody: validateBacktestBody,
  },
  handler
);
