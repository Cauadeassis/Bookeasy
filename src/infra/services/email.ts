import { SendEmailProps } from "../email/sender";

export async function sendEmail({
  email,
  emailType,
}: SendEmailProps): Promise<Response> {
  const response = await fetch("../api/send-email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, emailType }),
  });
  console.log(response);
  return response;
}
