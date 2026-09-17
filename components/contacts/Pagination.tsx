import { Icon } from "@/components/ui/Icon";

type PaginationProps = {
  page: number;
  totalPages: number;
  from: number;
  to: number;
  total: number;
  onPageChange: (page: number) => void;
};

function getPageItems(page: number, totalPages: number): (number | "gap")[] {
  const pages = new Set([1, totalPages, page - 1, page, page + 1]);
  const sorted = [...pages].filter((p) => p >= 1 && p <= totalPages).sort((a, b) => a - b);
  return sorted.flatMap((p, index) =>
    index > 0 && p - sorted[index - 1] > 1 ? (["gap", p] as const) : [p],
  );
}

const pageButton = "flex h-8 min-w-8 items-center justify-center rounded-full px-1 text-label-sm";

export function Pagination({ page, totalPages, from, to, total, onPageChange }: PaginationProps) {
  return (
    <div className="neu-inset flex flex-col items-center justify-between gap-4 border-t border-[#d8e2ec] px-6 py-4 sm:flex-row">
      <div className="flex items-center gap-1 text-body-sm text-on-surface-variant">
        แสดง
        <span className="font-semibold text-on-surface">
          {total === 0 ? 0 : `${from} - ${to}`}
        </span>
        จาก
        <span className="font-semibold text-on-surface">{total}</span>
        รายชื่อ
      </div>
      {totalPages > 1 && (
        <nav className="flex items-center gap-2" aria-label="เปลี่ยนหน้า">
          <button
            type="button"
            aria-label="หน้าก่อนหน้า"
            disabled={page === 1}
            onClick={() => onPageChange(page - 1)}
            className={`${pageButton} neu-btn disabled:cursor-not-allowed disabled:opacity-40`}
          >
            <Icon name="chevron_left" size={16} />
          </button>
          {getPageItems(page, totalPages).map((item, index) =>
            item === "gap" ? (
              <span key={`gap-${index}`} className="px-1 text-label-sm text-on-surface-variant">
                ...
              </span>
            ) : (
              <button
                key={item}
                type="button"
                aria-current={item === page ? "page" : undefined}
                onClick={() => onPageChange(item)}
                className={`${pageButton} ${
                  item === page ? "neu-btn-primary font-bold text-white" : "neu-btn"
                }`}
              >
                {item}
              </button>
            ),
          )}
          <button
            type="button"
            aria-label="หน้าถัดไป"
            disabled={page === totalPages}
            onClick={() => onPageChange(page + 1)}
            className={`${pageButton} neu-btn disabled:cursor-not-allowed disabled:opacity-40`}
          >
            <Icon name="chevron_right" size={16} />
          </button>
        </nav>
      )}
    </div>
  );
}
