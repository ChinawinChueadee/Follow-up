import type { Metadata } from "next";
import { AuthForm } from "@/components/auth/AuthForm";

export const metadata: Metadata = {
  title: "เข้าสู่ระบบ | Follow-up Board",
};

export default function SignInPage() {
  return <AuthForm mode="sign-in" />;
}
