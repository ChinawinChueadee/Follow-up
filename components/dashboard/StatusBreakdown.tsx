import type { StatusSlice } from "@/lib/mock-data";
import { toneBg, toneHex, toneText } from "@/lib/tone";
import { SectionCard } from "./SectionCard";

const RADIUS = 38;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const GAP = 4;

export function StatusBreakdown({ slices }: { slices: StatusSlice[] }) {
  const total = slices.reduce((sum, slice) => sum + slice.count, 0);

  const arcs = slices.map((slice, index) => {
    const before = slices.slice(0, index).reduce((sum, s) => sum + s.count, 0);
    const length = (slice.count / total) * CIRCUMFERENCE;
    return {
      slice,
      dash: Math.max(length - GAP, 0),
      offset: (before / total) * CIRCUMFERENCE,
    };
  });

  return (
    <SectionCard
      icon="pie_chart"
      title="สัดส่วนสถานะการติดตาม"
      badge={
        <span className="neu-inset-sm rounded-full px-2.5 py-0.5 text-label-sm font-medium text-on-surface-variant">
          เดือนนี้
        </span>
      }
    >
      <div className="flex flex-col items-center justify-center gap-4 py-1 sm:flex-row lg:flex-col xl:flex-row">
        <div className="relative flex h-36 w-36 shrink-0 items-center justify-center">
          <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100" aria-hidden="true">
            <circle cx="50" cy="50" r={RADIUS} fill="transparent" stroke="#dfe6f0" strokeWidth="12" />
            {arcs.map(({ slice, dash, offset }) => (
              <circle
                key={slice.label}
                cx="50"
                cy="50"
                r={RADIUS}
                fill="transparent"
                stroke={toneHex[slice.tone]}
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={`${dash} ${CIRCUMFERENCE}`}
                strokeDashoffset={-offset}
              />
            ))}
          </svg>
          <div className="neu-flat absolute flex h-20 w-20 flex-col items-center justify-center rounded-full text-center">
            <span className="text-headline-md font-bold">{total}</span>
            <span className="-mt-1 text-label-sm font-medium text-on-surface-variant">ทั้งหมด</span>
          </div>
        </div>

        <div className="flex w-full flex-col gap-2.5">
          {slices.map((slice) => (
            <div
              key={slice.label}
              className="neu-inset-sm flex items-center justify-between gap-2 rounded-xl p-2 text-body-sm"
            >
              <div className="flex items-center gap-2">
                <span className={`h-3 w-3 shrink-0 rounded-full ${toneBg[slice.tone]}`} />
                <span className="font-medium">{slice.label}</span>
              </div>
              <span
                className={`shrink-0 font-bold ${
                  slice.tone === "error" ? toneText.error : "text-on-surface"
                }`}
              >
                {slice.count} ({Math.round((slice.count / total) * 100)}%)
              </span>
            </div>
          ))}
        </div>
      </div>
    </SectionCard>
  );
}
