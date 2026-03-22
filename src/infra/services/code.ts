import { randomInt } from "crypto";
import database from "../database";
import { sendEmail } from "./email";

export async function sendCode(email: string) {
    const code = randomInt(100000, 999999).toString();
    await database.query({
        text: `INSERT INTO password_reset_codes (email, code, expires_at) 
         VALUES ($1, $2, NOW() + INTERVAL '15 minutes')`,
        values: [email, code],
    });
    await sendEmail({ email, emailType: "forgot-password" });
}
