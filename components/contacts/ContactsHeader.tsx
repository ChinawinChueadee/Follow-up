import Link from "next/link";
import { useRef } from "react";
import { Icon } from "@/components/ui/Icon";

type ContactsHeaderProps = {
  total: number;
  onImport: (file: File) => void;
  onExport: () => void;
  onAdd: () => void;
};

const secondaryButton =
  "neu-btn inline-flex items-center gap-1 rounded-full border border-white/60 px-4 py-2 text-label-md";

export function ContactsHeader({ total, onImport, onExport, onAdd }: ContactsHeaderProps) {
  const fileRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
      <div>
        <nav className="mb-1 flex items-center gap-1 text-label-sm text-on-surface-variant">
          <Link href="/dashboard" className="hover:text-primary">
            หน้าหลัก
          </Link>
          <Icon name="chevron_right" size={14} />
          <span className="font-semibold text-primary">รายชื่อผู้ติดต่อ</span>
        </nav>
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-headline-md font-bold tracking-tight sm:text-headline-xl">
            รายชื่อผู้ติดต่อ (Contacts Directory)
          </h1>
          <span className="neu-inset-sm inline-flex items-center rounded-full px-2 py-0.5 text-label-sm font-semibold text-primary">
            {total} รายชื่อทั้งหมด
          </span>
        </div>
        <p className="mt-1 text-body-md text-on-surface-variant">
          จัดการ ติดตามสถานะ ค้นหา และกรองรายชื่อผู้ติดต่อทั้งหมดในระบบ
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <input
          ref={fileRef}
          type="file"
          accept=".csv,text/csv"
          className="hidden"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) onImport(file);
            event.target.value = "";
          }}
        />
        <button type="button" className={secondaryButton} onClick={() => fileRef.current?.click()}>
          <Icon name="file_upload" size={18} className="text-on-surface-variant" />
          นำเข้า (Import)
        </button>
        <button type="button" className={secondaryButton} onClick={onExport}>
          <Icon name="download" size={18} className="text-on-surface-variant" />
          ส่งออก Excel/CSV
        </button>
        <button
          type="button"
          onClick={onAdd}
          className="neu-btn-primary inline-flex items-center gap-1 rounded-full px-6 py-2 text-label-md text-white"
        >
          <Icon name="person_add" size={18} />
          เพิ่มผู้ติดต่อใหม่
        </button>
      </div>
    </div>
  );
}
