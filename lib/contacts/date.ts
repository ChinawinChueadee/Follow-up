import type { Contact } from "./types";

// วันที่ทั้งหมดเก็บเป็นสตริง "YYYY-MM-DD" / "YYYY-MM-DDTHH:mm" ตามเวลาไทย
// เพื่อให้ผลลัพธ์บน server และ client ตรงกัน

const THAI_MONTHS = [
  "ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.",
  "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค.",
];

const DAY_MS = 24 * 60 * 60 * 1000;

export function getTodayInBangkok(now = new Date()) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Bangkok",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

function toUtc(date: string) {
  const [year, month, day] = date.split("-").map(Number);
  return Date.UTC(year, month - 1, day);
}

export function addDays(date: string, days: number) {
  return new Date(toUtc(date) + days * DAY_MS).toISOString().slice(0, 10);
}

export function diffDays(from: string, to: string) {
  return Math.round((toUtc(to) - toUtc(from)) / DAY_MS);
}

export function splitDateTime(value: string) {
  const [date, time = ""] = value.split("T");
  return { date, time };
}

export function formatThaiDate(value: string, today: string) {
  const { date, time } = splitDateTime(value);
  if (!date) return "-";
  const [year, month, day] = date.split("-").map(Number);
  const sameYear = date.slice(0, 4) === today.slice(0, 4);
  const parts = [`${day} ${THAI_MONTHS[month - 1]}`];
  if (!sameYear) parts.push(String(year));
  if (time) parts.push(time);
  return parts.join(" ");
}

export type DueInfo = {
  label: string;
  icon: string;
  tone: "error" | "primary" | "tertiary" | "default";
  diff: number;
};

export function getDueInfo(contact: Pick<Contact, "followUpAt" | "status">, today: string): DueInfo {
  const { date, time } = splitDateTime(contact.followUpAt);
  const diff = date ? diffDays(today, date) : Number.POSITIVE_INFINITY;

  if (contact.status === "closed") {
    return { label: "ปิดงานแล้ว", icon: "check_circle", tone: "tertiary", diff };
  }
  if (!date) {
    return { label: "ยังไม่กำหนด", icon: "event", tone: "default", diff };
  }
  if (diff < 0) {
    return { label: `เลยกำหนด ${-diff} วัน`, icon: "priority_high", tone: "error", diff };
  }
  if (diff === 0) {
    return { label: `วันนี้ ${time}`.trim(), icon: "schedule", tone: "primary", diff };
  }
  if (diff === 1) {
    return { label: `พรุ่งนี้ ${time}`.trim(), icon: "event", tone: "default", diff };
  }
  if (diff < 7) {
    return { label: `อีก ${diff} วัน`, icon: "event", tone: "default", diff };
  }
  return { label: "ตามกำหนด", icon: "event", tone: "default", diff };
}

export function nowStamp(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Bangkok",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);
  const get = (type: string) => parts.find((part) => part.type === type)?.value ?? "";
  return `${get("year")}-${get("month")}-${get("day")}T${get("hour")}:${get("minute")}`;
}

/** แปลง "YYYY-MM-DDTHH:mm" (เวลาไทย) เป็น Date สำหรับเก็บลงฐานข้อมูล */
export function bangkokToDate(value: string) {
  return new Date(`${value}:00+07:00`);
}
