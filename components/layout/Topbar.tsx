import { Icon } from "@/components/ui/Icon";
import { currentUser, todayFollowUps } from "@/lib/mock-data";

export function Topbar() {
  return (
    <header className="sticky top-0 z-40 px-4 pt-4">
      <div className="neu-flat flex min-h-16 w-full flex-wrap items-center justify-between gap-3 rounded-2xl px-4 py-3 sm:px-6">
        <div className="relative w-full max-w-xs">
          <Icon
            name="search"
            size={18}
            className="pointer-events-none absolute top-1/2 left-2 -translate-y-1/2 text-on-surface-variant"
          />
          <input
            type="text"
            placeholder="ค้นหาชื่อ, บริษัท, หรือเบอร์โทร..."
            className="neu-inset w-full rounded-2xl py-2 pr-4 pl-10 text-body-sm placeholder:text-on-surface-variant focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-4">
          <div className="neu-inset hidden items-center gap-1 rounded-full px-3.5 py-1.5 sm:flex">
            <Icon name="calendar_today" size={16} className="text-primary" />
            <span className="text-label-sm font-semibold text-primary">
              {todayFollowUps.length} ติดตามวันนี้
            </span>
          </div>
          <button
            type="button"
            className="neu-btn-primary flex items-center gap-1 rounded-2xl px-4 py-2 text-label-md text-white"
          >
            <Icon name="add" size={16} />
            <span>เพิ่มรายชื่อ</span>
          </button>
          <div className="flex items-center gap-2 pl-1">
            <div className="hidden text-right md:block">
              <p className="text-label-md font-semibold leading-tight">{currentUser.name}</p>
              <p className="text-label-sm text-on-surface-variant">{currentUser.role}</p>
            </div>
            <div className="neu-flat flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl text-label-lg font-bold text-primary">
              {currentUser.initials}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
