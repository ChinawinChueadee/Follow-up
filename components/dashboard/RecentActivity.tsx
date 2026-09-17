import { Icon } from "@/components/ui/Icon";
import type { Activity } from "@/lib/mock-data";
import { toneText } from "@/lib/tone";
import { SectionCard } from "./SectionCard";

export function RecentActivity({ activities }: { activities: Activity[] }) {
  return (
    <SectionCard
      icon="history"
      title="กิจกรรมล่าสุด"
      badge={
        <span className="neu-inset-sm flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-label-sm font-bold text-tertiary">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-tertiary" />
          สดใหม่
        </span>
      }
    >
      <div className="relative flex flex-col gap-4 before:absolute before:top-2 before:bottom-2 before:left-3.5 before:w-0.5 before:bg-divider">
        {activities.map((activity) => (
          <div key={activity.id} className="relative flex items-start gap-2">
            <div
              className={`neu-flat z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-xl ${toneText[activity.tone]}`}
            >
              <Icon name={activity.icon} size={14} className="font-bold" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-body-sm leading-tight">
                {activity.prefix}{" "}
                <span className="font-bold text-primary">{activity.contact}</span>
                {activity.suffix && ` ${activity.suffix}`}
              </p>
              {activity.detail && (
                <p className="mt-0.5 text-label-sm text-on-surface-variant">{activity.detail}</p>
              )}
              <div className="mt-1 flex flex-wrap items-center gap-1">
                {activity.status && (
                  <span
                    className={`neu-pill rounded-full px-2 py-0.5 text-label-sm font-semibold ${toneText[activity.status.tone]}`}
                  >
                    {activity.status.label}
                  </span>
                )}
                <span className="text-label-sm text-on-surface-variant">{activity.timeAgo}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        type="button"
        className="neu-btn mt-4 w-full rounded-2xl py-2.5 text-center text-label-md font-medium"
      >
        ดูประวัติการติดต่อทั้งหมด (Logs)
      </button>
    </SectionCard>
  );
}
