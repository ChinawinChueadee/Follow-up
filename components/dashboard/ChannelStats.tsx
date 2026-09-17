import { Icon } from "@/components/ui/Icon";
import type { ChannelStat } from "@/lib/mock-data";
import { toneBg, toneText } from "@/lib/tone";
import { SectionCard } from "./SectionCard";

export function ChannelStats({ channels }: { channels: ChannelStat[] }) {
  return (
    <SectionCard
      icon="hub"
      title="ช่องทางติดต่อยอดนิยม"
      badge={
        <span className="neu-inset-sm shrink-0 rounded-full px-2 py-0.5 text-label-sm font-bold text-primary">
          เฉลี่ยต่อสัปดาห์
        </span>
      }
    >
      <div className="flex flex-col gap-4">
        {channels.map((channel) => (
          <div key={channel.label}>
            <div className="mb-1.5 flex justify-between gap-2 text-label-md">
              <span className="flex items-center gap-1.5 font-medium">
                <Icon name={channel.icon} size={14} className={toneText[channel.tone]} />
                {channel.label}
              </span>
              <span className={`shrink-0 font-bold ${toneText[channel.tone]}`}>
                {channel.percent}% ({channel.count} ราย)
              </span>
            </div>
            <div className="neu-progress-bg h-3 w-full overflow-hidden rounded-full p-0.5">
              <div
                className={`h-full rounded-full ${toneBg[channel.tone]}`}
                style={{ width: `${channel.percent}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
