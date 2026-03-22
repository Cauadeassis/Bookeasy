import { Resend } from "resend";
import {
  accountAlreadyInUseEmail,
  confirmAccountEmail,
  forgotPasswordEmail,
  testEmail,
} from "./templates";

const resend = new Resend(process.env.RESEND_PAGEASY_API_KEY);
const emailSender = process.env.EMAIL_SENDER ?? "onboarding@resend.dev";
const emailRecipient = process.env.EMAIL_RECIPIENT ?? "";
export type EmailType = "test" | "confirm" | "warning" | "forgot-password";

export const emailMap = {
  test: { subject: "Test", react: testEmail },
  confirm: { subject: "Confirm Account", react: confirmAccountEmail },
  warning: { subject: "Security Warning", react: accountAlreadyInUseEmail },
  "forgot-password": {
    subject: "Forgotten Password",
    react: forgotPasswordEmail,
  },
} as const;

export interface SendEmailProps {
  email: string;
  emailType: EmailType;
}

export async function sendEmail({
  email = emailRecipient,
  emailType,
}: SendEmailProps) {
  const { subject, react } = emailMap[emailType];

  await resend.emails.send({
    from: emailSender,
    to: email,
    subject,
    react: react(),
  });
}
