import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <Sidebar />
      <div className="lg:pl-72">
        <Topbar />
        <main className="px-4 pt-6 pb-9">{children}</main>
      </div>
    </div>
  );
}
