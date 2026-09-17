"use server";

import { contactInclude, toContact, toContactData } from "@/lib/contacts/data";
import { getStatus, owners } from "@/lib/contacts/options";
import type { Contact, ContactStatus } from "@/lib/contacts/types";
import { isStatus, parseContactInput } from "@/lib/contacts/validation";
import { getCurrentUserId } from "@/lib/dal";
import { prisma } from "@/lib/prisma";

// ทุก action ตรวจการล็อกอินเอง และจำกัดข้อมูลด้วย userId ของผู้ใช้ปัจจุบันเสมอ

type Result<T> = { ok: true; data: T } | { ok: false; error: string };

const UNAUTHORIZED = "กรุณาเข้าสู่ระบบก่อน";
const NOT_FOUND = "ไม่พบผู้ติดต่อนี้";
const MAX_BATCH = 500;

function ids(value: unknown) {
  return Array.isArray(value)
    ? value.filter((id): id is string => typeof id === "string").slice(0, MAX_BATCH)
    : [];
}

async function myContacts(userId: string, contactIds: string[]) {
  const rows = await prisma.contact.findMany({
    where: { userId, id: { in: contactIds } },
    include: contactInclude,
  });
  return rows.map(toContact);
}

export async function createContact(raw: unknown): Promise<Result<Contact>> {
  const userId = await getCurrentUserId();
  if (!userId) return { ok: false, error: UNAUTHORIZED };
  const parsed = parseContactInput(raw);
  if (!parsed.ok) return parsed;

  const row = await prisma.contact.create({
    data: {
      ...toContactData(parsed.value),
      userId,
      history: {
        create: {
          icon: "person_add",
          title: "เพิ่มผู้ติดต่อ",
          detail: parsed.value.note || "สร้างรายชื่อใหม่",
        },
      },
    },
    include: contactInclude,
  });
  return { ok: true, data: toContact(row) };
}

export async function updateContact(id: string, raw: unknown): Promise<Result<Contact>> {
  const userId = await getCurrentUserId();
  if (!userId) return { ok: false, error: UNAUTHORIZED };
  if (typeof id !== "string") return { ok: false, error: NOT_FOUND };
  const parsed = parseContactInput(raw);
  if (!parsed.ok) return parsed;

  const { count } = await prisma.contact.updateMany({
    where: { id, userId },
    data: toContactData(parsed.value),
  });
  if (count === 0) return { ok: false, error: NOT_FOUND };

  await prisma.contactHistory.create({
    data: { contactId: id, icon: "edit", title: "แก้ไขข้อมูลผู้ติดต่อ", detail: "อัปเดตข้อมูลติดต่อ" },
  });
  const [contact] = await myContacts(userId, [id]);
  return { ok: true, data: contact };
}

export async function addContactNote(id: string, rawNote: unknown): Promise<Result<Contact>> {
  const userId = await getCurrentUserId();
  if (!userId) return { ok: false, error: UNAUTHORIZED };
  if (typeof id !== "string") return { ok: false, error: NOT_FOUND };
  const note = typeof rawNote === "string" ? rawNote.trim().slice(0, 2000) : "";
  if (!note) return { ok: false, error: "กรุณาพิมพ์บันทึก" };

  const { count } = await prisma.contact.updateMany({ where: { id, userId }, data: { note } });
  if (count === 0) return { ok: false, error: NOT_FOUND };

  await prisma.contactHistory.create({
    data: { contactId: id, icon: "edit_note", title: "บันทึกการติดตาม", detail: note },
  });
  const [contact] = await myContacts(userId, [id]);
  return { ok: true, data: contact };
}

export async function deleteContacts(rawIds: unknown): Promise<Result<string[]>> {
  const userId = await getCurrentUserId();
  if (!userId) return { ok: false, error: UNAUTHORIZED };
  const owned = await prisma.contact.findMany({
    where: { userId, id: { in: ids(rawIds) } },
    select: { id: true },
  });
  const ownedIds = owned.map((row) => row.id);
  await prisma.contact.deleteMany({ where: { userId, id: { in: ownedIds } } });
  return { ok: true, data: ownedIds };
}

async function bulkUpdate(
  rawIds: unknown,
  data: { status?: ContactStatus; owner?: string },
  history: { icon: string; title: string; detail: string },
): Promise<Result<Contact[]>> {
  const userId = await getCurrentUserId();
  if (!userId) return { ok: false, error: UNAUTHORIZED };
  const owned = await prisma.contact.findMany({
    where: { userId, id: { in: ids(rawIds) } },
    select: { id: true },
  });
  const ownedIds = owned.map((row) => row.id);

  await prisma.$transaction([
    prisma.contact.updateMany({ where: { userId, id: { in: ownedIds } }, data }),
    prisma.contactHistory.createMany({
      data: ownedIds.map((contactId) => ({ contactId, ...history })),
    }),
  ]);
  return { ok: true, data: await myContacts(userId, ownedIds) };
}

export async function updateContactsStatus(rawIds: unknown, status: unknown) {
  if (!isStatus(status)) return { ok: false, error: "สถานะไม่ถูกต้อง" } as const;
  return bulkUpdate(rawIds, { status }, {
    icon: "published_with_changes",
    title: "เปลี่ยนสถานะ",
    detail: getStatus(status).label,
  });
}

export async function assignContactsOwner(rawIds: unknown, owner: unknown) {
  if (typeof owner !== "string" || !owners.includes(owner)) {
    return { ok: false, error: "ผู้ดูแลไม่ถูกต้อง" } as const;
  }
  return bulkUpdate(rawIds, { owner }, {
    icon: "assignment_turned_in",
    title: "มอบหมายผู้ดูแล",
    detail: owner,
  });
}

export async function importContacts(rawList: unknown, fileName: unknown): Promise<Result<Contact[]>> {
  const userId = await getCurrentUserId();
  if (!userId) return { ok: false, error: UNAUTHORIZED };
  if (!Array.isArray(rawList)) return { ok: false, error: "ข้อมูลนำเข้าไม่ถูกต้อง" };

  const valid = rawList
    .slice(0, MAX_BATCH)
    .map(parseContactInput)
    .flatMap((result) => (result.ok ? [result.value] : []));
  if (valid.length === 0) return { ok: false, error: "ไม่พบข้อมูลที่นำเข้าได้ในไฟล์นี้" };

  const detail = typeof fileName === "string" ? fileName.slice(0, 200) : "";
  const rows = await prisma.$transaction(
    valid.map((input) =>
      prisma.contact.create({
        data: {
          ...toContactData(input),
          userId,
          history: { create: { icon: "file_upload", title: "นำเข้าจากไฟล์", detail } },
        },
        include: contactInclude,
      }),
    ),
  );
  return { ok: true, data: rows.map(toContact) };
}
