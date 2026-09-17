import { Icon } from "@/components/ui/Icon";
import { getChannel } from "@/lib/contacts/options";
import type { Contact } from "@/lib/contacts/types";
import { Checkbox, ContactAvatar, DueLabel, StatusBadge } from "./ContactBits";
import { RowActions } from "./RowActions";

type ContactsTableProps = {
  contacts: Contact[];
  today: string;
  selectedIds: Set<string>;
  onToggle: (id: string, checked: boolean) => void;
  onToggleAll: (checked: boolean) => void;
  onView: (contact: Contact) => void;
  onEdit: (contact: Contact) => void;
  onDelete: (contact: Contact) => void;
  pagination: React.ReactNode;
};

export function ContactsTable({
  contacts,
  today,
  selectedIds,
  onToggle,
  onToggleAll,
  onView,
  onEdit,
  onDelete,
  pagination,
}: ContactsTableProps) {
  const selectedOnPage = contacts.filter((contact) => selectedIds.has(contact.id)).length;
  const allSelected = contacts.length > 0 && selectedOnPage === contacts.length;

  return (
    <div className="neu-card overflow-hidden rounded-3xl">
      <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="neu-inset border-b border-[#d8e2ec] text-label-md tracking-wider text-on-surface-variant">
              <th className="w-10 py-4 pr-1 pl-6">
                <Checkbox
                  label="เลือกทั้งหมดในหน้านี้"
                  checked={allSelected}
                  indeterminate={selectedOnPage > 0 && !allSelected}
                  onChange={onToggleAll}
                />
              </th>
              <th className="px-4 py-4">ชื่อและบริษัท</th>
              <th className="px-4 py-4">ช่องทางติดต่อ</th>
              <th className="px-4 py-4">สถานะ</th>
              <th className="px-4 py-4">กำหนดติดตาม</th>
              <th className="min-w-[180px] px-4 py-4">หมายเหตุล่าสุด</th>
              <th className="py-4 pr-6 pl-2 text-right">จัดการ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#dce5ef] text-body-md">
            {contacts.length === 0 && (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-on-surface-variant">
                  <Icon name="search" size={32} className="mb-2 block" />
                  ไม่พบรายชื่อผู้ติดต่อที่ตรงกับเงื่อนไข
                </td>
              </tr>
            )}
            {contacts.map((contact) => {
              const channel = getChannel(contact.channel);
              return (
                <tr
                  key={contact.id}
                  onClick={() => onView(contact)}
                  className={`group cursor-pointer transition-colors hover:bg-[#e2e9f2] ${
                    selectedIds.has(contact.id) ? "bg-[#e2e9f2]" : ""
                  }`}
                >
                  <td className="py-4 pr-1 pl-6">
                    <Checkbox
                      label={`เลือก ${contact.name}`}
                      checked={selectedIds.has(contact.id)}
                      onChange={(checked) => onToggle(contact.id, checked)}
                    />
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <ContactAvatar contact={contact} />
                      <div className="flex min-w-0 flex-col">
                        <span className="truncate text-title-md font-semibold transition-colors group-hover:text-primary">
                          {contact.name}
                        </span>
                        <span className="flex items-center gap-1.5 truncate text-body-sm text-on-surface-variant">
                          <Icon name="apartment" size={14} />
                          {contact.company || "-"}
                        </span>
                        {contact.interest && (
                          <span className="mt-0.5 truncate text-label-sm text-primary">
                            สนใจ: {contact.interest}
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-col gap-0.5">
                      {contact.phone && (
                        <span className="flex items-center gap-1.5 text-label-md whitespace-nowrap">
                          <Icon name="phone_iphone" size={14} className="text-secondary" />
                          {contact.phone}
                        </span>
                      )}
                      {contact.email && (
                        <span className="flex max-w-[210px] items-center gap-1.5 text-body-sm whitespace-nowrap text-on-surface-variant">
                          <Icon name="mail" size={14} />
                          <span className="truncate" title={contact.email}>
                            {contact.email}
                          </span>
                        </span>
                      )}
                      <span className="flex items-center gap-1.5 text-label-sm whitespace-nowrap text-tertiary">
                        <Icon name={channel.icon} size={14} />
                        {channel.label}
                        {contact.lineId && contact.channel === "line" && ` @${contact.lineId}`}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <StatusBadge status={contact.status} />
                  </td>
                  <td className="px-4 py-4">
                    <DueLabel contact={contact} today={today} />
                  </td>
                  <td className="px-4 py-4">
                    <p className="line-clamp-2 max-w-xs text-body-sm text-on-surface-variant">
                      {contact.note || "-"}
                    </p>
                  </td>
                  <td className="py-4 pr-6 pl-2 text-right">
                    <RowActions
                      contact={contact}
                      onView={() => onView(contact)}
                      onEdit={() => onEdit(contact)}
                      onDelete={() => onDelete(contact)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {pagination}
    </div>
  );
}
