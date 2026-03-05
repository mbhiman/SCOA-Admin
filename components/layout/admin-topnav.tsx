"use client";

import { Bell, Search, Moon, Sun, ChevronDown, LogOut, User, Settings } from "lucide-react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { useUIStore } from "@/store/ui-store";
import { useState } from "react";
import Link from "next/link";

const routeLabels: Record<string, string> = {
  "/admin/dashboard": "Dashboard",
  "/admin/students": "Students",
  "/admin/courses": "Courses",
  "/admin/questions": "Questions",
  "/admin/exams": "Exams",
  "/admin/certificates": "Certificates",
  "/admin/admins": "Admins",
  "/admin/roles": "Roles & Permissions",
  "/admin/audit-logs": "Audit Logs",
  "/admin/analytics": "Analytics",
  "/admin/settings": "Settings",
};

const mockNotifications = [
  { id: 1, text: "New student registered: Rahul Verma", time: "2m ago", unread: true },
  { id: 2, text: "Exam attempt failed: Course #C-112", time: "15m ago", unread: true },
  { id: 3, text: "Certificate issued: Priya Sharma", time: "1h ago", unread: false },
  { id: 4, text: "Bulk export ready for download", time: "3h ago", unread: false },
];

export function AdminTopNav() {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const { setCommandOpen } = useUIStore();
  const [notifOpen, setNotifOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);

  const currentLabel = Object.entries(routeLabels).find(([key]) =>
    pathname.startsWith(key)
  )?.[1] ?? "Admin";

  const unreadCount = mockNotifications.filter((n) => n.unread).length;

  return (
    <header
      className="flex items-center justify-between h-16 px-6 border-b shrink-0"
      style={{
        background: "var(--card)",
        borderColor: "var(--border)",
      }}
    >
      {/* Breadcrumb */}
      <div className="flex items-center gap-2">
        <span className="text-sm" style={{ color: "var(--muted-foreground)" }}>
          Admin
        </span>
        <span style={{ color: "var(--muted-foreground)" }}>/</span>
        <span className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
          {currentLabel}
        </span>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2">
        {/* Search / Command */}
        <button
          onClick={() => setCommandOpen(true)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm border transition-colors hover:bg-[var(--muted)]"
          style={{
            color: "var(--muted-foreground)",
            borderColor: "var(--border)",
            background: "var(--muted)",
          }}
        >
          <Search className="w-3.5 h-3.5" />
          <span>Search...</span>
          <kbd
            className="ml-4 text-[10px] px-1.5 py-0.5 rounded border"
            style={{
              background: "var(--background)",
              borderColor: "var(--border)",
              color: "var(--muted-foreground)",
            }}
          >
            ⌘K
          </kbd>
        </button>

        {/* Theme Toggle */}
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="w-9 h-9 flex items-center justify-center rounded-md border transition-colors hover:bg-[var(--muted)]"
          style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}
        >
          {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="relative w-9 h-9 flex items-center justify-center rounded-md border transition-colors hover:bg-[var(--muted)]"
            style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span
                className="absolute -top-1 -right-1 w-4 h-4 text-[10px] font-bold rounded-full flex items-center justify-center text-white"
                style={{ background: "var(--primary)" }}
              >
                {unreadCount}
              </span>
            )}
          </button>

          {notifOpen && (
            <div
              className="absolute right-0 top-11 w-80 rounded-xl border shadow-xl z-50"
              style={{ background: "var(--popover)", borderColor: "var(--border)" }}
            >
              <div className="p-4 border-b" style={{ borderColor: "var(--border)" }}>
                <p className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
                  Notifications
                </p>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {mockNotifications.map((n) => (
                  <div
                    key={n.id}
                    className="flex items-start gap-3 px-4 py-3 border-b hover:bg-[var(--muted)] cursor-pointer"
                    style={{ borderColor: "var(--border)" }}
                  >
                    {n.unread && (
                      <div
                        className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: "var(--primary)" }}
                      />
                    )}
                    {!n.unread && <div className="mt-1.5 w-1.5 h-1.5 flex-shrink-0" />}
                    <div>
                      <p className="text-xs" style={{ color: "var(--foreground)" }}>
                        {n.text}
                      </p>
                      <p className="text-[10px] mt-0.5" style={{ color: "var(--muted-foreground)" }}>
                        {n.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-3 text-center">
                <button className="text-xs font-medium" style={{ color: "var(--primary)" }}>
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setUserOpen(!userOpen)}
            className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-md border transition-colors hover:bg-[var(--muted)]"
            style={{ borderColor: "var(--border)" }}
          >
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
              style={{ background: "var(--primary)" }}
            >
              SA
            </div>
            <span className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
              Super Admin
            </span>
            <ChevronDown className="w-3.5 h-3.5" style={{ color: "var(--muted-foreground)" }} />
          </button>

          {userOpen && (
            <div
              className="absolute right-0 top-11 w-52 rounded-xl border shadow-xl z-50 py-1"
              style={{ background: "var(--popover)", borderColor: "var(--border)" }}
            >
              <div className="px-4 py-3 border-b" style={{ borderColor: "var(--border)" }}>
                <p className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
                  Super Admin
                </p>
                <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                  admin@scoa.flipkart.com
                </p>
              </div>
              {[
                { icon: User, label: "Profile", href: "/admin/settings" },
                { icon: Settings, label: "Settings", href: "/admin/settings" },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-[var(--muted)] transition-colors"
                  style={{ color: "var(--foreground)" }}
                  onClick={() => setUserOpen(false)}
                >
                  <item.icon className="w-4 h-4" style={{ color: "var(--muted-foreground)" }} />
                  {item.label}
                </Link>
              ))}
              <div className="border-t mt-1 pt-1" style={{ borderColor: "var(--border)" }}>
                <button
                  className="flex w-full items-center gap-3 px-4 py-2 text-sm hover:bg-[var(--muted)] transition-colors"
                  style={{ color: "var(--destructive)" }}
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
