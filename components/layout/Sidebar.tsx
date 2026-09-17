"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { authClient } from "@/lib/auth-client";
import { pendingHandoffCount } from "@/lib/mock-data";

const navItems = [
  { href: "/dashboard", label: "แดชบอร์ด", icon: "dashboard" },
  { href: "/contacts", label: "รายชื่อผู้ติดต่อ", icon: "group" },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [signingOut, setSigningOut] = useState(false);

  const handleSignOut = async () => {
    setSigningOut(true);
    await authClient.signOut();
    router.push("/sign-in");
    router.refresh();
  };

  return (
    <aside className="z-50 p-4 lg:fixed lg:inset-y-0 lg:left-0 lg:w-72">
      <div className="neu-flat flex h-full w-full flex-col justify-between gap-4 rounded-3xl p-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 px-1 pt-1 pb-6">
            <div className="neu-flat flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-primary-container">
              <Icon name="contact_page" size={26} />
            </div>
            <div className="flex min-w-0 flex-col">
              <span className="truncate text-title-md font-bold leading-tight">
                Follow-up Board
              </span>
              <span className="truncate text-label-sm font-semibold text-on-surface-variant">
                ระบบจัดการการติดตาม
              </span>
            </div>
          </div>

          <div className="px-1 pb-2">
            <span className="text-label-sm font-semibold tracking-wider text-on-surface-variant uppercase">
              เมนูหลัก
            </span>
          </div>

          <nav className="flex flex-col gap-2.5">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`flex items-center gap-2 rounded-2xl px-4 py-3 text-label-lg ${
                    isActive
                      ? "neu-nav-active font-semibold text-primary"
                      : "neu-btn text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  <Icon name={item.icon} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex flex-col gap-4">
          <div className="neu-inset flex items-center justify-between rounded-2xl p-3.5">
            <div className="flex min-w-0 items-center gap-2">
              <div className="neu-flat flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-error">
                <Icon name="alarm" size={16} />
              </div>
              <span className="truncate text-label-md font-medium">งานค้างส่งต่อ</span>
            </div>
            <span className="neu-pill rounded-full bg-error-container px-2.5 py-1 text-label-sm font-bold text-error">
              {pendingHandoffCount} งาน
            </span>
          </div>
          <button
            type="button"
            onClick={handleSignOut}
            disabled={signingOut}
            className="neu-btn flex items-center gap-2 rounded-2xl px-4 py-3 text-label-lg text-on-surface-variant hover:text-error disabled:cursor-wait disabled:opacity-70"
          >
            <Icon name="logout" />
            <span>{signingOut ? "กำลังออกจากระบบ..." : "ออกจากระบบ"}</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
