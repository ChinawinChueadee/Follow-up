import { Icon } from "@/components/ui/Icon";
import {
  followUpBaseActions,
  queueFilters,
  type FollowUp,
  type FollowUpAction,
} from "@/lib/mock-data";
import { toneText } from "@/lib/tone";

const actionClass: Record<FollowUpAction["variant"], string> = {
  primary: "neu-btn-primary text-white",
  neutral: "neu-btn text-on-surface-variant hover:text-on-surface",
  success: "neu-btn font-bold text-tertiary",
};

function ActionButton({ action }: { action: FollowUpAction }) {
  const shape = action.label ? "gap-1.5 px-3.5 py-1.5" : "h-9 w-9 justify-center";
  return (
    <button
      type="button"
      className={`inline-flex items-center rounded-xl text-label-sm ${shape} ${actionClass[action.variant]}`}
    >
      <Icon name={action.icon} size={16} />
      {action.label}
    </button>
  );
}

function FollowUpCard({ item }: { item: FollowUp }) {
  return (
    <div className="neu-card rounded-3xl p-4">
      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
        <div className="flex min-w-0 items-start gap-2">
          <div
            className={`neu-flat flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-title-lg font-bold ${toneText[item.channel.tone]}`}
          >
            {item.initials}
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-1">
              <span className="truncate text-title-md font-bold">{item.name}</span>
              <span
                className={`neu-pill inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-label-sm font-medium ${toneText[item.channel.tone]}`}
              >
                <Icon name={item.channel.icon} size={12} />
                {item.channel.label}
              </span>
              <span
                className={`inline-flex items-center rounded-full px-2 py-0.5 text-label-sm ${
                  item.tag.urgent
                    ? "neu-pill bg-error-container font-bold text-error"
                    : `neu-inset-sm font-medium ${
                        item.tag.tone === "muted" ? "text-on-surface" : toneText[item.tag.tone]
                      }`
                }`}
              >
                {item.tag.label}
              </span>
            </div>
            <p className="mt-1 flex items-center gap-1 text-label-md text-on-surface-variant">
              <Icon name={item.companyIcon} size={14} />
              {item.company}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 sm:flex-col sm:items-end">
          <span
            className={`neu-inset-sm flex items-center gap-1 rounded-full px-3 py-1 text-label-sm font-bold ${toneText[item.time.tone]}`}
          >
            <Icon name={item.time.icon} size={14} />
            {item.time.label}
          </span>
          <span className="mt-1 hidden text-label-sm text-on-surface-variant sm:block">
            {item.subject}
          </span>
        </div>
      </div>

      <div className="neu-inset mt-2 flex items-start gap-1 rounded-2xl p-3 text-body-sm">
        <Icon name="sticky_note_2" size={16} className="mt-0.5 shrink-0 text-primary" />
        <p className="truncate">
          <span className="font-semibold text-primary">บันทึก:</span> {item.note}
        </p>
      </div>

      <div className="mt-2 flex flex-wrap items-center justify-between gap-1 pt-1">
        <div className="flex flex-wrap items-center gap-1">
          {followUpBaseActions.map((action) => (
            <ActionButton key={action.icon} action={action} />
          ))}
        </div>
        <div className="flex items-center gap-2">
          {item.actions.map((action) => (
            <ActionButton key={action.icon} action={action} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function FollowUpQueue({ items }: { items: FollowUp[] }) {
  return (
    <div className="flex flex-col gap-4 lg:col-span-8">
      <div className="flex flex-wrap items-center justify-between gap-2 px-1">
        <div className="flex items-center gap-2">
          <div className="neu-flat flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-primary">
            <Icon name="notification_important" size={18} />
          </div>
          <h2 className="text-title-lg font-bold">
            รายการที่ต้องติดตามวันนี้ (Today&apos;s Follow-up Queue)
          </h2>
          <span className="neu-inset-sm shrink-0 rounded-full px-2.5 py-0.5 text-label-sm font-bold text-primary">
            {items.length} รายการค้าง
          </span>
        </div>
        <div className="neu-inset hidden items-center gap-1.5 rounded-2xl p-1.5 sm:flex">
          {queueFilters.map((filter, index) => (
            <button
              key={filter}
              type="button"
              className={`rounded-xl px-3.5 py-1 text-label-sm ${
                index === 0
                  ? "neu-btn font-semibold text-on-surface"
                  : "text-on-surface-variant transition-colors hover:text-on-surface"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {items.map((item) => (
        <FollowUpCard key={item.id} item={item} />
      ))}
    </div>
  );
}
