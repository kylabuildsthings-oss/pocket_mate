import { withSecureApi } from "@/lib/apiSecurity";
import type { ClientLogBody } from "@/lib/pocketmate/validation/clientLogBody";
import { validateClientLogBody } from "@/lib/pocketmate/validation/clientLogBody";
import type { NextApiRequest, NextApiResponse } from "next";

function handler(req: NextApiRequest, res: NextApiResponse) {
  const body = req.body as ClientLogBody;
  console.warn(
    "[pm-client]",
    JSON.stringify({
      source: body.source,
      message: body.message.slice(0, 240),
      digest: body.digest,
      path: body.path,
    })
  );
  res.status(204).end();
}

export default withSecureApi(
  {
    methods: ["POST"],
    rateLimit: { windowMs: 60_000, max: 40 },
    validateBody: validateClientLogBody,
    auditEvent: "pocketmate.client_log",
  },
  handler
);
