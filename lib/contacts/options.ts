import type { ContactChannel, ContactStatus, DueFilter } from "./types";

type Option<T extends string> = { value: T; label: string };

export const statusOptions: (Option<ContactStatus> & { dot: string; text: string })[] = [
  { value: "new", label: "รายการใหม่", dot: "bg-amber-500", text: "text-amber-800" },
  { value: "talking", label: "กำลังคุย", dot: "bg-primary-container", text: "text-primary" },
  { value: "closed", label: "ปิดงาน", dot: "bg-tertiary", text: "text-tertiary" },
];

export const channelOptions: (Option<ContactChannel> & { icon: string })[] = [
  { value: "phone", label: "โทรศัพท์", icon: "call" },
  { value: "line", label: "LINE", icon: "chat" },
  { value: "email", label: "อีเมล", icon: "mail" },
  { value: "meeting", label: "นัดพบ / ประชุม", icon: "handshake" },
  { value: "video", label: "วิดีโอคอล", icon: "video_call" },
];

export const dueFilterOptions: Option<DueFilter>[] = [
  { value: "all", label: "ทุกวัน" },
  { value: "today", label: "วันนี้" },
  { value: "overdue", label: "เลยกำหนด" },
  { value: "week", label: "7 วันข้างหน้า" },
];

export const owners = ["คุณศรัณย์ น.", "คุณมานพ ก.", "คุณปรียา ส."];

export const PAGE_SIZE = 7;

export function getStatus(value: ContactStatus) {
  return statusOptions.find((option) => option.value === value) ?? statusOptions[0];
}

export function getChannel(value: ContactChannel) {
  return channelOptions.find((option) => option.value === value) ?? channelOptions[0];
}
