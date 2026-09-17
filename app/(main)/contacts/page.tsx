import type { Metadata } from "next";
import { connection } from "next/server";
import { ContactsView } from "@/components/contacts/ContactsView";
import { getTodayInBangkok } from "@/lib/contacts/date";
import { listMyContacts } from "@/lib/contacts/data";

export const metadata: Metadata = {
  title: "รายชื่อผู้ติดต่อ | Follow-up Board",
};

export default async function ContactsPage() {
  // ใช้วันที่ ณ เวลาที่มีคำขอ (ไม่ใช่ตอน build) เพื่อคำนวณกำหนดติดตาม
  await connection();
  const today = getTodayInBangkok();
  const contacts = await listMyContacts();

  return <ContactsView initialContacts={contacts} today={today} />;
}
