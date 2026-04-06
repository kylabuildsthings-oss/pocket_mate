import { NextApiRequest, NextApiResponse } from "next";
import inviteMemberHTML from "@/data/emails/inviteMember";
import sgMail, { MailDataRequired } from "@sendgrid/mail";
import { getRequiredEnv } from "@/lib/env";
import { withSecureApi, validateRequiredFields } from "@/lib/apiSecurity";

async function inviteMember(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { token, email, familyName } = req.body as {
      token: string;
      email: string;
      familyName: string;
    };

    sgMail.setApiKey(getRequiredEnv("SENDGRID_API_KEY"));
    const msg = {
      to: email,
      from: process.env.SENDGRID_TRANSPORTER_EMAIL_ADDRESS,
      subject: "New Member Invitaton",
      text: `${familyName} has invited you to DefiKids`,
      html: inviteMemberHTML(token, familyName),
    } as MailDataRequired;

    sgMail
      .send(msg)
      .then(() => {
        console.log(`Employee Invite email successfully sent to ${email}`);
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
    auditEvent: "email.invite.requested",
    validateBody: validateRequiredFields(["token", "email", "familyName"]),
  },
  inviteMember
);
