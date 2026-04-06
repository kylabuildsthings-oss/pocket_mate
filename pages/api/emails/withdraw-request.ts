import { NextApiRequest, NextApiResponse } from "next";
import withdrawRequestHTML from "@/data/emails/withdrawRequest";
import sgMail, { MailDataRequired } from "@sendgrid/mail";
import { getRequiredEnv } from "@/lib/env";
import { withSecureApi, validateRequiredFields } from "@/lib/apiSecurity";

async function WithdrawRequest(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { email, username, amount, parentAddress } = req.body as {
      email: string;
      username: string;
      amount: string;
      parentAddress: string;
    };

    sgMail.setApiKey(getRequiredEnv("SENDGRID_API_KEY"));
    const msg = {
      to: email,
      from: process.env.SENDGRID_TRANSPORTER_EMAIL_ADDRESS,
      subject: "DefiKids - Member withdrawal request",
      text: `${username} has requested to withdraw funds.`,
      html: withdrawRequestHTML(username, "7", amount, parentAddress),
    } as MailDataRequired;

    sgMail
      .send(msg)
      .then(() => {
        console.log(`Withdraw request email successfully sent to ${email}`);
      })
      .catch((error) => {
        console.error(error.response.body);
      });

    res.status(200).json({ message: "Email sent" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
}

export default withSecureApi(
  {
    methods: ["POST"],
    rateLimit: { windowMs: 60_000, max: 20 },
    auditEvent: "email.withdraw.requested",
    validateBody: validateRequiredFields(["email", "username", "amount", "parentAddress"]),
  },
  WithdrawRequest
);
