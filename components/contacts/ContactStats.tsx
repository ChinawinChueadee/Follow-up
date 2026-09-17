import { Icon } from "@/components/ui/Icon";
import { diffDays, splitDateTime } from "@/lib/contacts/date";
import type { Contact } from "@/lib/contacts/types";

type Stat = {
  label: string;
  value: string;
  note: string;
  icon: string;
  valueClass: string;
  noteClass: string;
  labelClass?: string;
};

export function ContactStats({ contacts, today }: { contacts: Contact[]; today: string }) {
  const dayOf = (contact: Contact) => diffDays(today, splitDateTime(contact.followUpAt).date);
  const open = contacts.filter((c) => c.status !== "closed");

  const dueToday = open.filter((c) => dayOf(c) === 0).length;
  const dueYesterday = contacts.filter((c) => dayOf(c) === -1).length;
  const change = dueToday - dueYesterday;
  const overdue = open.filter((c) => dayOf(c) < 0).length;
  const closed = contacts.filter((c) => c.status === "closed").length;
  const closeRate = contacts.length ? (closed / contacts.length) * 100 : 0;
  const talking = contacts.filter((c) => c.status === "talking");
  const talkingChannels = new Set(talking.map((c) => c.channel)).size;

  const stats: Stat[] = [
    {
      label: "ต้องติดตามวันนี้",
      value: String(dueToday),
      note: `${change >= 0 ? "+" : ""}${change} จากเมื่อวาน`,
      icon: "today",
      valueClass: "text-on-surface",
      noteClass: "font-medium text-primary",
    },
    {
      label: "เกินกำหนดติดตาม",
      value: String(overdue),
      note: overdue > 0 ? "ต้องรีบติดต่อ" : "ไม่มีรายการค้าง",
      icon: "warning",
      valueClass: "text-error",
      noteClass: "text-on-surface-variant",
      labelClass: "font-medium text-error",
    },
    {
      label: "อัตราการปิดงาน",
      value: `${closeRate.toFixed(1)}%`,
      note: `ปิดแล้ว ${closed} ราย`,
      icon: "trending_up",
      valueClass: "text-tertiary",
      noteClass: "font-medium text-tertiary",
    },
    {
      label: "อยู่ระหว่างเจรจา",
      value: String(talking.length),
      note: `รวม ${talkingChannels} ช่องทาง`,
      icon: "sync_alt",
      valueClass: "text-secondary",
      noteClass: "text-on-surface-variant",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="neu-card flex items-center justify-between gap-2 rounded-2xl p-4"
        >
          <div className="space-y-1">
            <span
              className={`text-label-sm tracking-wider uppercase ${stat.labelClass ?? "text-on-surface-variant"}`}
            >
              {stat.label}
            </span>
            <div className="flex flex-wrap items-baseline gap-1">
              <span className={`text-headline-md font-bold ${stat.valueClass}`}>{stat.value}</span>
              <span className={`text-label-sm ${stat.noteClass}`}>{stat.note}</span>
            </div>
          </div>
          <div
            className={`neu-inset flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${stat.valueClass === "text-on-surface" ? "text-primary" : stat.valueClass}`}
          >
            <Icon name={stat.icon} size={20} />
          </div>
        </div>
      ))}
    </div>
  );
}
