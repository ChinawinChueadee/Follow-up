import { Icon } from "@/components/ui/Icon";
import { Menu } from "@/components/ui/Menu";
import type { Contact } from "@/lib/contacts/types";

type RowActionsProps = {
  contact: Contact;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
};

const roundButton = "neu-btn flex h-8 w-8 items-center justify-center rounded-full";

export function RowActions({ contact, onView, onEdit, onDelete }: RowActionsProps) {
  return (
    <div className="flex items-center justify-end gap-1.5" onClick={(event) => event.stopPropagation()}>
      {contact.phone && (
        <a href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`} title="โทรด่วน" className={`${roundButton} text-secondary`}>
          <Icon name="call" size={16} />
        </a>
      )}
      <button type="button" title="แก้ไข" aria-label="แก้ไข" onClick={onEdit} className={roundButton}>
        <Icon name="edit" size={16} />
      </button>
      <Menu
        align="end"
        ariaLabel="ตัวเลือกเพิ่มเติม"
        buttonClassName={`${roundButton} text-on-surface-variant`}
        label={<Icon name="more_vert" size={16} />}
        items={[
          { label: "ดูรายละเอียด", icon: "visibility", onSelect: onView },
          { label: "แก้ไขข้อมูล", icon: "edit", onSelect: onEdit },
          { label: "ลบผู้ติดต่อ", icon: "delete", danger: true, onSelect: onDelete },
        ]}
      />
    </div>
  );
}
