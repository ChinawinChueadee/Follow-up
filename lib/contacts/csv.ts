import { channelOptions, getChannel, getStatus, owners, statusOptions } from "./options";
import type { ContactInput } from "./types";

const columns: { header: string; get: (c: ContactInput) => string; key: keyof ContactInput }[] = [
  { header: "ชื่อ", key: "name", get: (c) => c.name },
  { header: "บริษัทหรือองค์กร", key: "company", get: (c) => c.company },
  { header: "อีเมล", key: "email", get: (c) => c.email },
  { header: "เบอร์โทรศัพท์", key: "phone", get: (c) => c.phone },
  { header: "LINE ID", key: "lineId", get: (c) => c.lineId },
  { header: "ช่องทางการติดต่อ", key: "channel", get: (c) => getChannel(c.channel).label },
  { header: "สิ่งที่สนใจ", key: "interest", get: (c) => c.interest },
  { header: "สถานะ", key: "status", get: (c) => getStatus(c.status).label },
  { header: "วันที่ต้อง Follow-up", key: "followUpAt", get: (c) => c.followUpAt.replace("T", " ") },
  { header: "ผู้ดูแล", key: "owner", get: (c) => c.owner },
  { header: "หมายเหตุ", key: "note", get: (c) => c.note },
];

function escapeCell(value: string) {
  return /[",\r\n]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value;
}

export function contactsToCsv(contacts: ContactInput[]) {
  const lines = [
    columns.map((column) => column.header),
    ...contacts.map((contact) => columns.map((column) => column.get(contact))),
  ].map((row) => row.map(escapeCell).join(","));
  // ใส่ BOM เพื่อให้ Excel อ่านภาษาไทยได้ถูกต้อง
  return `﻿${lines.join("\r\n")}`;
}

function parseRows(text: string) {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let quoted = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (quoted) {
      if (char === '"' && text[i + 1] === '"') {
        cell += '"';
        i++;
      } else if (char === '"') {
        quoted = false;
      } else {
        cell += char;
      }
    } else if (char === '"') {
      quoted = true;
    } else if (char === ",") {
      row.push(cell);
      cell = "";
    } else if (char === "\n" || char === "\r") {
      if (char === "\r" && text[i + 1] === "\n") i++;
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
    } else {
      cell += char;
    }
  }
  if (cell !== "" || row.length > 0) {
    row.push(cell);
    rows.push(row);
  }
  return rows.filter((r) => r.some((value) => value.trim() !== ""));
}

function normalizeDateTime(value: string) {
  const match = value.trim().match(/^(\d{4}-\d{2}-\d{2})(?:[ T](\d{2}:\d{2}))?/);
  if (!match) return "";
  return `${match[1]}T${match[2] ?? "09:00"}`;
}

/** แปลงไฟล์ CSV (หัวตารางแบบเดียวกับไฟล์ที่ส่งออก) เป็นรายการผู้ติดต่อ ข้ามแถวที่ไม่มีชื่อ */
export function csvToContacts(text: string, fallbackOwner: string): ContactInput[] {
  const [header, ...rows] = parseRows(text.replace(/^﻿/, ""));
  if (!header) return [];

  const indexOf = (key: keyof ContactInput) => {
    const column = columns.find((c) => c.key === key);
    return column ? header.findIndex((h) => h.trim() === column.header) : -1;
  };
  const read = (row: string[], key: keyof ContactInput) => {
    const index = indexOf(key);
    return index >= 0 ? (row[index] ?? "").trim() : "";
  };

  return rows
    .map((row): ContactInput => {
      const channelLabel = read(row, "channel");
      const statusLabel = read(row, "status");
      const owner = read(row, "owner");
      return {
        name: read(row, "name"),
        company: read(row, "company"),
        email: read(row, "email"),
        phone: read(row, "phone"),
        lineId: read(row, "lineId"),
        channel: channelOptions.find((o) => o.label === channelLabel)?.value ?? "phone",
        interest: read(row, "interest"),
        status: statusOptions.find((o) => o.label === statusLabel)?.value ?? "new",
        followUpAt: normalizeDateTime(read(row, "followUpAt")),
        owner: owners.includes(owner) ? owner : fallbackOwner,
        note: read(row, "note"),
      };
    })
    .filter((contact) => contact.name !== "");
}
