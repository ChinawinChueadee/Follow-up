import { Icon } from "@/components/ui/Icon";
import { Menu } from "@/components/ui/Menu";
import { owners, statusOptions } from "@/lib/contacts/options";
import type { ContactStatus } from "@/lib/contacts/types";

type BulkActionBarProps = {
  count: number;
  total: number;
  onChangeStatus: (status: ContactStatus) => void;
  onEmail: () => void;
  onAssign: (owner: string) => void;
  onDelete: () => void;
  onClear: () => void;
};

const actionButton =
  "neu-btn inline-flex items-center gap-1 rounded-full border border-white/70 px-3 py-1.5 text-label-sm";

export function BulkActionBar({
  count,
  total,
  onChangeStatus,
  onEmail,
  onAssign,
  onDelete,
  onClear,
}: BulkActionBarProps) {
  return (
    <div className="neu-flat flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-white/80 px-4 py-3">
      <div className="flex items-center gap-2">
        <div className="neu-btn-primary flex h-6 min-w-6 items-center justify-center rounded-full px-1 text-label-sm font-bold text-white">
          {count}
        </div>
        <span className="text-label-md font-medium">
          เลือกไว้ {count} รายการ จากทั้งหมด {total}
        </span>
      </div>
      <div className="flex flex-wrap items-center gap-1">
        <Menu
          buttonClassName={actionButton}
          label={
            <>
              <Icon name="published_with_changes" size={16} className="text-primary" />
              เปลี่ยนสถานะ
            </>
          }
          items={statusOptions.map((option) => ({
            label: option.label,
            onSelect: () => onChangeStatus(option.value),
          }))}
        />
        <button type="button" className={actionButton} onClick={onEmail}>
          <Icon name="mail" size={16} className="text-secondary" />
          ส่งอีเมลพร้อมกัน
        </button>
        <Menu
          buttonClassName={actionButton}
          label={
            <>
              <Icon name="assignment_turned_in" size={16} className="text-tertiary" />
              มอบหมายผู้ดูแล
            </>
          }
          items={owners.map((owner) => ({ label: owner, icon: "person", onSelect: () => onAssign(owner) }))}
        />
        <button type="button" className={`${actionButton} text-error`} onClick={onDelete}>
          <Icon name="delete" size={16} />
          ลบที่เลือก
        </button>
        <button
          type="button"
          aria-label="ยกเลิกการเลือก"
          onClick={onClear}
          className="neu-btn ml-1 flex h-7 w-7 items-center justify-center rounded-full text-on-surface-variant hover:text-on-surface"
        >
          <Icon name="close" size={14} />
        </button>
      </div>
    </div>
  );
}
