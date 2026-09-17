"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { authClient } from "@/lib/auth-client";

type Mode = "sign-in" | "sign-up";

const MIN_PASSWORD_LENGTH = 8;

const content: Record<
  Mode,
  { title: string; subtitle: string; submit: string; switchText: string; switchLink: string; switchHref: string }
> = {
  "sign-in": {
    title: "เข้าสู่ระบบ",
    subtitle: "ยินดีต้อนรับกลับ ล็อกอินเพื่อจัดการการติดตามผู้ติดต่อ",
    submit: "เข้าสู่ระบบ",
    switchText: "ยังไม่มีบัญชี?",
    switchLink: "สมัครสมาชิก",
    switchHref: "/sign-up",
  },
  "sign-up": {
    title: "สมัครสมาชิก",
    subtitle: "สร้างบัญชีใหม่เพื่อเริ่มใช้งาน Follow-up Board",
    submit: "สมัครสมาชิก",
    switchText: "มีบัญชีอยู่แล้ว?",
    switchLink: "เข้าสู่ระบบ",
    switchHref: "/sign-in",
  },
};

const errorMessages: Record<string, string> = {
  INVALID_EMAIL_OR_PASSWORD: "อีเมลหรือรหัสผ่านไม่ถูกต้อง",
  USER_ALREADY_EXISTS: "อีเมลนี้ถูกใช้สมัครแล้ว",
  USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL: "อีเมลนี้ถูกใช้สมัครแล้ว",
  INVALID_EMAIL: "รูปแบบอีเมลไม่ถูกต้อง",
  PASSWORD_TOO_SHORT: `รหัสผ่านต้องมีอย่างน้อย ${MIN_PASSWORD_LENGTH} ตัวอักษร`,
  PASSWORD_TOO_LONG: "รหัสผ่านยาวเกินไป",
};

const fieldClass =
  "neu-inset w-full rounded-xl py-2.5 pr-4 pl-11 text-body-md placeholder:text-on-surface-variant focus:outline-none";

function Field({
  label,
  icon,
  children,
}: {
  label: string;
  icon: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-label-md font-semibold">{label}</span>
      <span className="relative flex items-center">
        <Icon
          name={icon}
          size={18}
          className="pointer-events-none absolute left-4 text-on-surface-variant"
        />
        {children}
      </span>
    </label>
  );
}

export function AuthForm({ mode }: { mode: Mode }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const text = content[mode];

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setPending(true);

    const { error: authError } =
      mode === "sign-up"
        ? await authClient.signUp.email({ name: name.trim(), email: email.trim(), password })
        : await authClient.signIn.email({ email: email.trim(), password });

    if (authError) {
      setError(
        (authError.code && errorMessages[authError.code]) ||
          authError.message ||
          "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง",
      );
      setPending(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  };

  return (
    <div className="neu-card w-full max-w-md rounded-3xl p-6 sm:p-9">
      <div className="mb-6 flex items-center gap-2">
        <div className="neu-flat flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-primary-container">
          <Icon name="contact_page" size={26} />
        </div>
        <div className="flex flex-col">
          <span className="text-title-md font-bold leading-tight">Follow-up Board</span>
          <span className="text-label-sm font-semibold text-on-surface-variant">
            ระบบจัดการการติดตาม
          </span>
        </div>
      </div>

      <h1 className="text-headline-md font-bold">{text.title}</h1>
      <p className="mt-1 text-body-md text-on-surface-variant">{text.subtitle}</p>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
        {mode === "sign-up" && (
          <Field label="ชื่อ" icon="person">
            <input
              required
              autoComplete="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="เช่น คุณศรัณย์ นามสมมติ"
              className={fieldClass}
            />
          </Field>
        )}
        <Field label="อีเมล" icon="mail">
          <input
            required
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="name@company.com"
            className={fieldClass}
          />
        </Field>
        <Field label="รหัสผ่าน" icon="lock">
          <input
            required
            type={showPassword ? "text" : "password"}
            autoComplete={mode === "sign-up" ? "new-password" : "current-password"}
            minLength={mode === "sign-up" ? MIN_PASSWORD_LENGTH : undefined}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder={
              mode === "sign-up" ? `อย่างน้อย ${MIN_PASSWORD_LENGTH} ตัวอักษร` : "รหัสผ่านของคุณ"
            }
            className={`${fieldClass} pr-12`}
          />
          <button
            type="button"
            onClick={() => setShowPassword((value) => !value)}
            aria-label={showPassword ? "ซ่อนรหัสผ่าน" : "แสดงรหัสผ่าน"}
            className="absolute right-2 flex h-8 w-8 items-center justify-center rounded-full text-on-surface-variant hover:text-on-surface"
          >
            <Icon name={showPassword ? "visibility_off" : "visibility"} size={18} />
          </button>
        </Field>

        {error && (
          <p
            role="alert"
            className="neu-inset-sm flex items-center gap-2 rounded-xl px-3 py-2 text-body-sm font-medium text-error"
          >
            <Icon name="error" size={16} />
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="neu-btn-primary mt-2 flex items-center justify-center gap-2 rounded-2xl py-3 text-label-lg font-semibold text-white disabled:cursor-wait disabled:opacity-70"
        >
          <Icon name={mode === "sign-up" ? "person_add" : "login"} size={18} />
          {pending ? "กำลังดำเนินการ..." : text.submit}
        </button>
      </form>

      <p className="mt-6 text-center text-body-md text-on-surface-variant">
        {text.switchText}{" "}
        <Link href={text.switchHref} className="font-semibold text-primary hover:underline">
          {text.switchLink}
        </Link>
      </p>
    </div>
  );
}
