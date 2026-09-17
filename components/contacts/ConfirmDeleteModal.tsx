import { Modal } from "@/components/ui/Modal";

type ConfirmDeleteModalProps = {
  names: string[];
  submitting: boolean;
  onConfirm: () => void;
  onClose: () => void;
};

const MAX_LISTED = 5;

export function ConfirmDeleteModal({ names, submitting, onConfirm, onClose }: ConfirmDeleteModalProps) {
  const listed = names.slice(0, MAX_LISTED);
  return (
    <Modal title="ยืนยันการลบผู้ติดต่อ" icon="delete" onClose={onClose}>
      <p className="mt-2 text-body-md">
        ต้องการลบผู้ติดต่อ {names.length} รายการต่อไปนี้หรือไม่? ข้อมูลที่ลบแล้วจะกู้คืนไม่ได้
      </p>
      <ul className="neu-inset mt-4 flex flex-col gap-1 rounded-2xl p-4 text-body-sm">
        {listed.map((name, index) => (
          <li key={index}>• {name}</li>
        ))}
        {names.length > MAX_LISTED && (
          <li className="text-on-surface-variant">และอีก {names.length - MAX_LISTED} รายการ</li>
        )}
      </ul>
      <div className="mt-6 flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="neu-btn rounded-xl px-4 py-2 text-label-md text-on-surface-variant hover:text-on-surface"
        >
          ยกเลิก
        </button>
        <button
          type="button"
          onClick={onConfirm}
          disabled={submitting}
          className="neu-btn rounded-xl bg-error-container px-6 py-2 text-label-md font-semibold text-error disabled:cursor-wait disabled:opacity-70"
        >
          {submitting ? "กำลังลบ..." : "ลบผู้ติดต่อ"}
        </button>
      </div>
    </Modal>
  );
}
