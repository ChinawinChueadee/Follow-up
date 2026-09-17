import type { Metadata } from "next";
import { AuthForm } from "@/components/auth/AuthForm";

export const metadata: Metadata = {
  title: "สมัครสมาชิก | Follow-up Board",
};

export default function SignUpPage() {
  return <AuthForm mode="sign-up" />;
}
