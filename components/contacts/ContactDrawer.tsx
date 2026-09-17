"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { formatThaiDate, getDueInfo } from "@/lib/contacts/date";
import { getChannel } from "@/lib/contacts/options";
import type { Contact } from "@/lib/contacts/types";
import { ContactAvatar, dueToneText, StatusBadge } from "./ContactBits";

type ContactDrawerProps = {
  contact: Contact;
  today: string;
  onClose: () => void;
  onSaveNote: (note: string) => Promise<boolean>;
};

const COLLAPSED_HISTORY = 2;

export function ContactDrawer({ contact, today, onClose, onSaveNote }: ContactDrawerProps) {
  const [note, setNote] = useState("");
  const [showAllHistory, setShowAllHistory] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const due = getDueInfo(contact, today);
  const channel = getChannel(contact.channel);
  // รายการที่เพิ่มทีหลังอยู่ท้าย array จึงกลับลำดับก่อน เพื่อให้เวลาเดียวกันแสดงรายการใหม่ก่อน
  const history = [...contact.history].reverse().sort((a, b) => b.at.localeCompare(a.at));
  const visibleHistory = showAllHistory ? history : history.slice(0, COLLAPSED_HISTORY);

  const saveNote = async () => {
    if (!note.trim()) return;
    if (await onSaveNote(note.trim())) setNote("");
  };

  const details: { label: string; value: string; className?: string }[] = [
    { label: "เบอร์โทรหลัก", value: contact.phone || "-" },
    { label: "อีเมล", value: contact.email || "-" },
    { label: "LINE ID", value: contact.lineId ? `@${contact.lineId}` : "-" },
    { label: "ช่องทางที่ติดต่อ", value: channel.label },
    { label: "สิ่งที่สนใจ", value: contact.interest || "-" },
    { label: "ผู้ดูแล", value: contact.owner || "-" },
    {
      label: "กำหนดติดตาม",
      value: `${due.label} (${formatThaiDate(contact.followUpAt, today)})`,
      className: `font-semibold ${dueToneText[due.tone]}`,
    },
  ];

  const quickActions = [
    {
      label: "โทรด่วน",
      icon: "call",
      className: "text-primary",
      href: contact.phone ? `tel:${contact.phone.replace(/[^\d+]/g, "")}` : undefined,
    },
    {
      label: "ส่งอีเมล",
      icon: "mail",
      className: "text-secondary",
      href: contact.email ? `mailto:${contact.email}` : undefined,
    },
    {
      label: "เปิด LINE",
      icon: "chat",
      className: "text-tertiary",
      href: contact.lineId
        ? `https://line.me/R/ti/p/~${encodeURIComponent(contact.lineId)}`
        : undefined,
    },
  ];

  return (
    <>
      <div
        className="fixed inset-0 z-[55] bg-slate-900/20 backdrop-blur-[2px]"
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={`ข้อมูลผู้ติดต่อ ${contact.name}`}
        className="fixed inset-y-0 right-0 z-[56] flex w-full flex-col justify-between gap-6 overflow-y-auto border-l border-white/80 bg-surface p-6 shadow-[-12px_0_30px_rgba(163,177,198,0.45)] sm:w-[440px]"
      >
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between border-b border-[#d8e2ec] pb-2">
            <div className="flex items-center gap-1">
              <Icon name="contacts" className="text-primary" />
              <span className="text-title-md font-semibold">ข้อมูลผู้ติดต่อด่วน</span>
            </div>
            <button
              type="button"
              aria-label="ปิด"
              onClick={onClose}
              className="neu-btn flex h-8 w-8 items-center justify-center rounded-full text-on-surface-variant"
            >
              <Icon name="close" size={18} />
            </button>
          </div>

          <div className="neu-card flex flex-col items-center rounded-2xl p-4 text-center">
            <div className="mb-2">
              <ContactAvatar contact={contact} size="lg" />
            </div>
            <h3 className="text-headline-md font-bold">{contact.name}</h3>
            <p className="text-body-md text-on-surface-variant">{contact.company || "-"}</p>
            <div className="mt-2">
              <StatusBadge status={contact.status} inset />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-1">
            {quickActions.map((action) =>
              action.href ? (
                <a
                  key={action.label}
                  href={action.href}
                  target={action.href.startsWith("http") ? "_blank" : undefined}
                  rel={action.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="neu-btn flex flex-col items-center justify-center rounded-xl p-2"
                >
                  <Icon name={action.icon} className={action.className} />
                  <span className="mt-1 text-label-sm font-medium">{action.label}</span>
                </a>
              ) : (
                <span
                  key={action.label}
                  aria-disabled="true"
                  title="ไม่มีข้อมูลสำหรับช่องทางนี้"
                  className="neu-inset-sm flex cursor-not-allowed flex-col items-center justify-center rounded-xl p-2 opacity-50"
                >
                  <Icon name={action.icon} />
                  <span className="mt-1 text-label-sm font-medium">{action.label}</span>
                </span>
              ),
            )}
          </div>

          <dl className="neu-inset flex flex-col gap-2 rounded-2xl p-4">
            {details.map((item) => (
              <div key={item.label} className="flex items-start justify-between gap-4">
                <dt className="shrink-0 text-label-sm text-on-surface-variant">{item.label}:</dt>
                <dd className={`text-right text-label-md break-all ${item.className ?? ""}`}>
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="flex flex-col gap-1">
            <p className="text-label-md font-semibold">หมายเหตุล่าสุด</p>
            <p className="text-body-sm text-on-surface-variant">{contact.note || "-"}</p>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="drawer-note" className="flex items-center justify-between text-label-md">
              <span className="font-semibold">เพิ่มบันทึกติดตามงานด่วน</span>
              <span className="text-body-sm text-on-surface-variant">บันทึกลงประวัติ</span>
            </label>
            <textarea
              id="drawer-note"
              rows={3}
              value={note}
              onChange={(event) => setNote(event.target.value)}
              placeholder="บันทึกผลการพูดคุย หรือสิ่งที่ต้องดำเนินการต่อ..."
              className="neu-inset w-full rounded-xl p-2 text-body-sm placeholder:text-on-surface-variant focus:outline-none"
            />
            <button
              type="button"
              onClick={saveNote}
              disabled={!note.trim()}
              className="neu-btn-primary self-end rounded-full px-4 py-1.5 text-label-sm text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              บันทึกโน้ต
            </button>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-label-sm font-semibold tracking-wider text-on-surface-variant uppercase">
              ประวัติการติดตาม{showAllHistory ? "ทั้งหมด" : "ย่อ"} ({history.length})
            </span>
            <div className="space-y-2.5">
              {visibleHistory.map((entry) => (
                <div key={entry.id} className="neu-card flex items-start gap-1 rounded-xl p-2 text-body-sm">
                  <Icon name={entry.icon} size={16} className="mt-0.5 text-primary" />
                  <div className="flex min-w-0 flex-col">
                    <span className="text-label-sm font-semibold">{entry.title}</span>
                    <span className="text-body-sm text-on-surface-variant">
                      {formatThaiDate(entry.at, today)} - {entry.detail}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-2 border-t border-[#d8e2ec] pt-4">
          <button
            type="button"
            disabled={history.length <= COLLAPSED_HISTORY}
            onClick={() => setShowAllHistory((value) => !value)}
            className="neu-btn w-full rounded-full border border-white/70 py-2.5 text-label-md disabled:cursor-not-allowed disabled:opacity-50"
          >
            {showAllHistory ? "ย่อประวัติ" : "ดูประวัติเต็ม"}
          </button>
          <button
            type="button"
            onClick={saveNote}
            disabled={!note.trim()}
            className="neu-btn-primary w-full rounded-full py-2.5 text-label-md text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            บันทึกการติดตาม
          </button>
        </div>
      </aside>
    </>
  );
}
