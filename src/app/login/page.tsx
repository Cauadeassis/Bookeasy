import { Metadata } from "next";
import LoginPage from "./login";

export const metadata: Metadata = {
  title: "Bookeasy - Login",
};

export default function Page() {
  return <LoginPage />;
}
