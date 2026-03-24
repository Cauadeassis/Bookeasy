import { SessionOptions } from "iron-session";

export interface SessionData {
  userId: number;
  email: string;
}

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET!,
  cookieName: "bookeasy-session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
  },
};
