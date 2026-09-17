import { channelOptions, owners, statusOptions } from "./options";
import type { ContactInput, ContactStatus } from "./types";

const LIMITS = { short: 200, note: 2000 } as const;
const DATE_TIME = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE = /^[0-9+\-\s()#]*$/;

type Result<T> = { ok: true; value: T } | { ok: false; error: string };

function text(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export function isStatus(value: unknown): value is ContactStatus {
  return statusOptions.some((option) => option.value === value);
}

/** ตรวจและทำความสะอาดข้อมูลผู้ติดต่อ (ใช้ฝั่ง server ทุกครั้งก่อนบันทึก) */
export function parseContactInput(raw: unknown): Result<ContactInput> {
  const data = (raw ?? {}) as Record<string, unknown>;
  const owner = text(data.owner, LIMITS.short);
  const value: ContactInput = {
    name: text(data.name, LIMITS.short),
    company: text(data.company, LIMITS.short),
    email: text(data.email, LIMITS.short),
    phone: text(data.phone, LIMITS.short),
    lineId: text(data.lineId, LIMITS.short).replace(/^@/, ""),
    channel: channelOptions.find((o) => o.value === data.channel)?.value ?? "phone",
    interest: text(data.interest, LIMITS.short),
    status: isStatus(data.status) ? data.status : "new",
    followUpAt: text(data.followUpAt, 16),
    note: text(data.note, LIMITS.note),
    owner: owners.includes(owner) ? owner : owners[0],
  };

  if (!value.name) return { ok: false, error: "กรุณากรอกชื่อผู้ติดต่อ" };
  if (!DATE_TIME.test(value.followUpAt)) return { ok: false, error: "วันที่ต้อง Follow-up ไม่ถูกต้อง" };
  if (value.email && !EMAIL.test(value.email)) return { ok: false, error: "รูปแบบอีเมลไม่ถูกต้อง" };
  if (!PHONE.test(value.phone)) return { ok: false, error: "เบอร์โทรศัพท์ไม่ถูกต้อง" };
  return { ok: true, value };
}
