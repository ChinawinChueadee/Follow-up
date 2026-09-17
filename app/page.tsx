import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { getSession } from "@/lib/dal";

const features = [
  {
    icon: "contacts",
    title: "จัดการรายชื่อผู้ติดต่อ",
    description: "เก็บข้อมูลผู้ติดต่อ บริษัท และช่องทางการติดต่อไว้ในที่เดียว",
  },
  {
    icon: "published_with_changes",
    title: "ติดตามสถานะ",
    description: "อัปเดตสถานะของผู้ติดต่อแต่ละรายเพื่อรู้ว่าอยู่ขั้นตอนไหน",
  },
  {
    icon: "calendar_month",
    title: "กำหนดวันติดตาม",
    description: "ตั้งวันติดตามครั้งถัดไป ไม่พลาดการติดต่อที่สำคัญ",
  },
];

export default async function HomePage() {
  const session = await getSession();

  return (
    <main className="flex min-h-screen w-full flex-col px-4 py-6 sm:px-8">
      <header className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="neu-flat flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-primary-container">
            <Icon name="contact_page" size={26} />
          </div>
          <div className="flex flex-col">
            <span className="text-title-md font-bold leading-tight">Follow-up Board</span>
            <span className="text-label-sm font-semibold text-on-surface-variant">
              ระบบจัดการการติดตาม
            </span>
          </div>
        </div>
        {!session && (
          <Link
            href="/sign-in"
            className="neu-btn rounded-2xl px-4 py-2.5 text-label-lg font-semibold text-primary"
          >
            เข้าสู่ระบบ
          </Link>
        )}
      </header>

      <section className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center gap-10 py-12">
        <div className="flex max-w-2xl flex-col items-center gap-4 text-center">
          <h1 className="text-headline-xl font-bold">
            ติดตามผู้ติดต่อได้ครบ ไม่พลาดทุกการติดตาม
          </h1>
          <p className="text-title-md text-on-surface-variant">
            ระบบจัดการรายชื่อผู้ติดต่อ สถานะ และวันติดตาม
          </p>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            {session ? (
              <Link
                href="/dashboard"
                className="neu-btn-primary flex items-center justify-center gap-2 rounded-2xl px-6 py-3 text-label-lg font-semibold text-white"
              >
                <Icon name="dashboard" size={18} />
                ไปที่แดชบอร์ด
              </Link>
            ) : (
              <>
                <Link
                  href="/sign-up"
                  className="neu-btn-primary flex items-center justify-center gap-2 rounded-2xl px-6 py-3 text-label-lg font-semibold text-white"
                >
                  <Icon name="person_add" size={18} />
                  สมัครสมาชิก
                </Link>
                <Link
                  href="/sign-in"
                  className="neu-btn flex items-center justify-center gap-2 rounded-2xl px-6 py-3 text-label-lg font-semibold text-primary"
                >
                  <Icon name="login" size={18} />
                  เข้าสู่ระบบ
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="grid w-full gap-5 sm:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} className="neu-card flex flex-col gap-3 rounded-3xl p-6">
              <div className="neu-inset-sm flex h-11 w-11 items-center justify-center rounded-2xl text-primary-container">
                <Icon name={feature.icon} size={22} />
              </div>
              <h2 className="text-title-md font-bold">{feature.title}</h2>
              <p className="text-body-md text-on-surface-variant">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
