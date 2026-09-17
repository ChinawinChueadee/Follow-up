import type { Metadata } from "next";
import { ChannelStats } from "@/components/dashboard/ChannelStats";
import { FollowUpQueue } from "@/components/dashboard/FollowUpQueue";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { StatusBreakdown } from "@/components/dashboard/StatusBreakdown";
import { SummaryCards } from "@/components/dashboard/SummaryCards";
import { Icon } from "@/components/ui/Icon";
import { verifySession } from "@/lib/dal";
import {
  channelStats,
  currentUser,
  recentActivities,
  statusBreakdown,
  summaryStats,
  todayFollowUps,
  todayLabel,
} from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "แดชบอร์ด | Follow-up Board",
};

export default async function DashboardPage() {
  await verifySession();

  return (
    <div className="flex w-full flex-col">
      <div className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div>
          <div className="neu-inset-sm mb-1 inline-flex items-center gap-2 rounded-full px-3 py-1">
            <span className="h-2.5 w-2.5 rounded-full bg-tertiary" />
            <span className="text-label-sm font-medium text-tertiary">
              ระบบพร้อมใช้งาน • {todayLabel}
            </span>
          </div>
          <h1 className="text-headline-xl font-bold tracking-tight">
            ยินดีต้อนรับกลับ, {currentUser.firstName} 👋
          </h1>
          <p className="mt-1 text-body-md text-on-surface-variant">
            ภาพรวมสถานะการติดตามผู้ติดต่อและงานเร่งด่วนประจำวัน
            จัดการทุกการสนทนาอย่างมีประสิทธิภาพ
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 self-start lg:self-auto">
          <button
            type="button"
            className="neu-btn flex items-center gap-2 rounded-2xl px-4 py-2.5 text-label-lg"
          >
            <Icon name="download" size={18} className="text-primary" />
            ส่งออกรายงาน (CSV)
          </button>
          <button
            type="button"
            className="neu-btn-primary flex items-center gap-2 rounded-2xl px-5 py-2.5 text-label-lg text-white"
          >
            <Icon name="person_add" size={18} />
            สร้างผู้ติดต่อใหม่
          </button>
        </div>
      </div>

      <SummaryCards stats={summaryStats} />

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
        <FollowUpQueue items={todayFollowUps} />
        <div className="flex flex-col gap-6 lg:col-span-4">
          <StatusBreakdown slices={statusBreakdown} />
          <ChannelStats channels={channelStats} />
          <RecentActivity activities={recentActivities} />
        </div>
      </div>
    </div>
  );
}
