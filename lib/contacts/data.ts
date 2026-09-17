import { verifySession } from "@/lib/dal";
import type { Prisma } from "@/lib/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { bangkokToDate, nowStamp } from "./date";
import type { Contact, ContactInput } from "./types";

export const contactInclude = {
  history: { orderBy: { at: "asc" } },
} satisfies Prisma.ContactInclude;

type ContactRow = Prisma.ContactGetPayload<{ include: typeof contactInclude }>;

export function toContact(row: ContactRow): Contact {
  return {
    id: row.id,
    name: row.name,
    company: row.company,
    email: row.email,
    phone: row.phone,
    lineId: row.lineId,
    channel: row.channel,
    interest: row.interest,
    status: row.status,
    followUpAt: nowStamp(row.followUpAt),
    note: row.note,
    owner: row.owner,
    history: row.history.map((entry) => ({
      id: entry.id,
      icon: entry.icon,
      title: entry.title,
      detail: entry.detail,
      at: nowStamp(entry.at),
    })),
  };
}

export function toContactData(input: ContactInput) {
  return { ...input, followUpAt: bangkokToDate(input.followUpAt) };
}

/** รายชื่อผู้ติดต่อของผู้ใช้ที่ล็อกอินอยู่เท่านั้น */
export async function listMyContacts() {
  const session = await verifySession();
  const rows = await prisma.contact.findMany({
    where: { userId: session.user.id },
    include: contactInclude,
    orderBy: { followUpAt: "asc" },
  });
  return rows.map(toContact);
}
