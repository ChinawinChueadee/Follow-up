import { Icon } from "@/components/ui/Icon";
import type { SummaryStat } from "@/lib/mock-data";
import { toneBg, toneText } from "@/lib/tone";

export function SummaryCards({ stats }: { stats: SummaryStat[] }) {
  return (
    <div className="mb-9 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="neu-card flex flex-col justify-between rounded-3xl p-6"
        >
          <div className="flex items-center justify-between">
            <span className="text-label-md font-semibold tracking-wider text-on-surface-variant uppercase">
              {stat.label}
            </span>
            <div
              className={`neu-flat flex h-12 w-12 items-center justify-center rounded-2xl ${toneText[stat.tone]}`}
            >
              <Icon
                name={stat.icon}
                size={24}
                className={stat.badge?.pulse ? "animate-pulse" : ""}
              />
            </div>
          </div>

          <div className="mt-4">
            <div className="flex items-baseline gap-1">
              <span
                className={`text-headline-xl font-bold ${
                  stat.valueTone ? toneText[stat.valueTone] : "text-on-surface"
                }`}
              >
                {stat.value}
              </span>
              <span className="text-title-md text-on-surface-variant">{stat.unit}</span>
            </div>

            <div className="mt-2 flex items-center gap-1.5">
              {stat.badge && (
                <span
                  className={`neu-inset-sm inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-label-sm font-bold ${toneText[stat.badge.tone]}`}
                >
                  {stat.badge.pulse && (
                    <span
                      className={`mr-0.5 h-2 w-2 animate-ping rounded-full ${toneBg[stat.badge.tone]}`}
                    />
                  )}
                  {stat.badge.icon && <Icon name={stat.badge.icon} size={12} />}
                  {stat.badge.label}
                </span>
              )}
              <span
                className={`flex items-center gap-1.5 text-label-sm ${
                  stat.noteIcon ? `font-medium ${toneText[stat.tone]}` : "text-on-surface-variant"
                }`}
              >
                {stat.noteIcon && <Icon name={stat.noteIcon} size={16} />}
                {stat.note}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
