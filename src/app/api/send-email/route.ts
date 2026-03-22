import {
  sendEmail,
  SendEmailProps as RequestBody,
} from "../../../infra/email/sender";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { email, emailType }: RequestBody = await request.json();

  if (!email || !emailType) {
    return Response.json({ error: "Missing fields" }, { status: 400 });
  }

  try {
    await sendEmail({ email, emailType });
    console.log("Email enviado!");
    return Response.json({ message: "Email sent!" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ error }, { status: 500 });
  }
}
