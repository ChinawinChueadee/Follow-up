import { Icon } from "@/components/ui/Icon";
import { Menu } from "@/components/ui/Menu";
import { channelOptions, dueFilterOptions, statusOptions } from "@/lib/contacts/options";
import type { ContactChannel, ContactStatus, DueFilter, ViewMode } from "@/lib/contacts/types";

type ContactsFiltersProps = {
  searchRef: React.Ref<HTMLInputElement>;
  search: string;
  onSearchChange: (value: string) => void;
  channel: ContactChannel | "all";
  onChannelChange: (value: ContactChannel | "all") => void;
  due: DueFilter;
  onDueChange: (value: DueFilter) => void;
  view: ViewMode;
  onViewChange: (value: ViewMode) => void;
  status: ContactStatus | "all";
  onStatusChange: (value: ContactStatus | "all") => void;
  statusCounts: Record<ContactStatus | "all", number>;
};

const pillButton =
  "neu-btn inline-flex items-center gap-1.5 rounded-full border border-white/60 px-4 py-2 text-label-md whitespace-nowrap";

export function ContactsFilters({ searchRef, ...props }: ContactsFiltersProps) {
  const channelLabel =
    props.channel === "all"
      ? "ทุกช่องทาง"
      : channelOptions.find((option) => option.value === props.channel)?.label;
  const dueLabel = dueFilterOptions.find((option) => option.value === props.due)?.label;

  const statusChips: { value: ContactStatus | "all"; label: string; dot?: string }[] = [
    { value: "all", label: "ทั้งหมด" },
    ...statusOptions.map((option) => ({ ...option })),
  ];

  return (
    <div className="neu-card flex flex-col gap-4 rounded-3xl p-4">
      <div className="flex flex-col items-stretch justify-between gap-4 lg:flex-row lg:items-center">
        <div className="relative flex w-full items-center lg:max-w-xl">
          <Icon
            name="search"
            className="pointer-events-none absolute left-4 text-on-surface-variant"
          />
          <input
            ref={searchRef}
            type="text"
            value={props.search}
            onChange={(event) => props.onSearchChange(event.target.value)}
            placeholder="ค้นหาด้วยชื่อ, บริษัท, เบอร์โทร, อีเมล หรือหมายเหตุ... (กด ⌘K เพื่อค้นหา)"
            className="neu-inset w-full rounded-full py-2.5 pr-24 pl-11 text-body-md placeholder:text-on-surface-variant focus:outline-none"
          />
          <div className="absolute right-2 flex items-center gap-1">
            <span className="neu-flat hidden rounded-full px-2 py-0.5 text-label-sm text-on-surface-variant sm:inline-block">
              ⌘K
            </span>
            {props.search && (
              <button
                type="button"
                aria-label="ล้างคำค้นหา"
                onClick={() => props.onSearchChange("")}
                className="neu-btn flex h-6 w-6 items-center justify-center rounded-full text-on-surface-variant hover:text-on-surface"
              >
                <Icon name="close" size={14} />
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Menu
            buttonClassName={pillButton}
            label={
              <>
                <Icon name="forum" size={16} className="text-secondary" />
                {channelLabel}
                <Icon name="expand_more" size={14} />
              </>
            }
            items={[
              {
                label: "ทุกช่องทาง",
                icon: "forum",
                active: props.channel === "all",
                onSelect: () => props.onChannelChange("all"),
              },
              ...channelOptions.map((option) => ({
                label: option.label,
                icon: option.icon,
                active: props.channel === option.value,
                onSelect: () => props.onChannelChange(option.value),
              })),
            ]}
          />
          <Menu
            buttonClassName={pillButton}
            label={
              <>
                <Icon name="calendar_month" size={16} className="text-primary" />
                กำหนดส่ง: {dueLabel}
                <Icon name="expand_more" size={14} />
              </>
            }
            items={dueFilterOptions.map((option) => ({
              label: option.label,
              active: props.due === option.value,
              onSelect: () => props.onDueChange(option.value),
            }))}
          />
          <div className="neu-inset flex items-center rounded-full p-1" role="group" aria-label="มุมมอง">
            {(
              [
                { value: "table", label: "ตาราง", icon: "table_rows" },
                { value: "board", label: "บอร์ด", icon: "view_kanban" },
              ] as const
            ).map((option) => {
              const active = props.view === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  aria-pressed={active}
                  onClick={() => props.onViewChange(option.value)}
                  className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-label-sm ${
                    active
                      ? "neu-btn font-semibold text-primary"
                      : "text-on-surface-variant transition-colors hover:text-on-surface"
                  }`}
                >
                  <Icon name={option.icon} size={16} />
                  <span className="hidden sm:inline">{option.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2.5">
        {statusChips.map((chip) => {
          const active = props.status === chip.value;
          return (
            <button
              key={chip.value}
              type="button"
              aria-pressed={active}
              onClick={() => props.onStatusChange(chip.value)}
              className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-label-md whitespace-nowrap ${
                active
                  ? "neu-inset font-semibold text-primary"
                  : "neu-btn border border-white/60 text-on-surface"
              }`}
            >
              {chip.dot && <span className={`h-2 w-2 rounded-full ${chip.dot}`} />}
              {chip.label}
              <span className="text-body-sm text-on-surface-variant">
                ({props.statusCounts[chip.value]})
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
