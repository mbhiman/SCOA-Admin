import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { AdminTopNav } from "@/components/layout/admin-topnav";
import { CommandPalette } from "@/components/layout/command-palette";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "var(--background)" }}>
      <AdminSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <AdminTopNav />
        <main className="flex-1 overflow-y-auto p-6" style={{ background: "var(--background)" }}>
          {children}
        </main>
      </div>
      <CommandPalette />
    </div>
  );
}
