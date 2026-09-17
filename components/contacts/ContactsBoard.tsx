import { Icon } from "@/components/ui/Icon";
import { getChannel, statusOptions } from "@/lib/contacts/options";
import type { Contact } from "@/lib/contacts/types";
import { Checkbox, ContactAvatar, DueLabel } from "./ContactBits";
import { RowActions } from "./RowActions";

type ContactsBoardProps = {
  contacts: Contact[];
  today: string;
  selectedIds: Set<string>;
  onToggle: (id: string, checked: boolean) => void;
  onView: (contact: Contact) => void;
  onEdit: (contact: Contact) => void;
  onDelete: (contact: Contact) => void;
};

export function ContactsBoard({
  contacts,
  today,
  selectedIds,
  onToggle,
  onView,
  onEdit,
  onDelete,
}: ContactsBoardProps) {
  return (
    <div className="grid auto-cols-[minmax(320px,1fr)] grid-flow-col gap-6 overflow-x-auto p-2 pb-4">
      {statusOptions.map((status) => {
        const items = contacts.filter((contact) => contact.status === status.value);
        return (
          <section key={status.value} className="neu-inset flex flex-col gap-4 rounded-3xl p-4">
            <header className="flex items-center justify-between px-1">
              <h2 className="flex items-center gap-2 text-title-md font-bold">
                <span className={`h-2.5 w-2.5 rounded-full ${status.dot}`} />
                {status.label}
              </h2>
              <span className="neu-pill rounded-full px-2.5 py-0.5 text-label-sm font-bold text-on-surface-variant">
                {items.length}
              </span>
            </header>
            {items.length === 0 && (
              <p className="py-6 text-center text-body-sm text-on-surface-variant">ไม่มีรายการ</p>
            )}
            {items.map((contact) => {
              const channel = getChannel(contact.channel);
              return (
                <article
                  key={contact.id}
                  onClick={() => onView(contact)}
                  className="neu-card cursor-pointer rounded-2xl p-4 transition-transform hover:-translate-y-0.5"
                >
                  <div className="flex items-start gap-2">
                    <div className="pt-3">
                      <Checkbox
                        label={`เลือก ${contact.name}`}
                        checked={selectedIds.has(contact.id)}
                        onChange={(checked) => onToggle(contact.id, checked)}
                      />
                    </div>
                    <ContactAvatar contact={contact} />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-title-md font-semibold">{contact.name}</p>
                      <p className="truncate text-body-sm text-on-surface-variant">
                        {contact.company || "-"}
                      </p>
                    </div>
                  </div>
                  {contact.interest && (
                    <p className="mt-2 truncate text-label-sm text-primary">สนใจ: {contact.interest}</p>
                  )}
                  <div className="neu-inset-sm mt-2 flex items-center justify-between gap-2 rounded-xl px-3 py-2">
                    <DueLabel contact={contact} today={today} />
                    <span className="flex items-center gap-1 text-label-sm whitespace-nowrap text-tertiary">
                      <Icon name={channel.icon} size={14} />
                      {channel.label}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center justify-between gap-2">
                    <span className="truncate text-label-sm text-on-surface-variant">
                      ผู้ดูแล: {contact.owner}
                    </span>
                    <RowActions
                      contact={contact}
                      onView={() => onView(contact)}
                      onEdit={() => onEdit(contact)}
                      onDelete={() => onDelete(contact)}
                    />
                  </div>
                </article>
              );
            })}
          </section>
        );
      })}
    </div>
  );
}
