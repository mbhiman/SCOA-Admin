"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  HelpCircle,
  ClipboardList,
  Award,
  BarChart3,
  Shield,
  Key,
  ScrollText,
  Settings,
  ChevronLeft,
  GraduationCap,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { useUIStore } from "@/store/ui-store";

const navItems = [
  {
    title: "Overview",
    items: [
      { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
      { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
    ],
  },
  {
    title: "Learning",
    items: [
      { href: "/admin/students", label: "Students", icon: Users },
      { href: "/admin/courses", label: "Courses", icon: BookOpen },
      { href: "/admin/questions", label: "Questions", icon: HelpCircle },
      { href: "/admin/exams", label: "Exams", icon: ClipboardList },
      { href: "/admin/certificates", label: "Certificates", icon: Award },
    ],
  },
  {
    title: "Administration",
    items: [
      { href: "/admin/admins", label: "Admins", icon: Shield },
      { href: "/admin/roles", label: "Roles & Perms", icon: Key },
      { href: "/admin/audit-logs", label: "Audit Logs", icon: ScrollText },
      { href: "/admin/settings", label: "Settings", icon: Settings },
    ],
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { sidebarCollapsed, toggleSidebar } = useUIStore();

  return (
    <aside
      className={cn(
        "relative flex flex-col h-full border-r transition-all duration-300 ease-in-out",
        sidebarCollapsed ? "w-[60px]" : "w-[240px]"
      )}
      style={{
        background: "var(--sidebar)",
        borderColor: "var(--sidebar-border)",
      }}
    >
      {/* Logo */}
      <div
        className="flex items-center gap-3 px-4 h-16 border-b"
        style={{ borderColor: "var(--sidebar-border)" }}
      >
        <div
          className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: "var(--primary)" }}
        >
          <GraduationCap className="w-4 h-4 text-white" />
        </div>
        {!sidebarCollapsed && (
          <div className="overflow-hidden">
            <p
              className="text-sm font-bold leading-none truncate"
              style={{ color: "var(--sidebar-foreground)" }}
            >
              SCOA Admin
            </p>
            <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>
              Flipkart Academy
            </p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-2">
        {navItems.map((group) => (
          <div key={group.title} className="mb-6">
            {!sidebarCollapsed && (
              <p
                className="px-2 mb-2 text-[10px] font-semibold uppercase tracking-widest"
                style={{ color: "var(--muted-foreground)" }}
              >
                {group.title}
              </p>
            )}
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/admin/dashboard" && pathname.startsWith(item.href));

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 px-2 py-2 rounded-md text-sm font-medium transition-all duration-150",
                        sidebarCollapsed && "justify-center",
                        isActive
                          ? "text-white"
                          : "hover:bg-[var(--sidebar-accent)]"
                      )}
                      style={
                        isActive
                          ? { background: "var(--primary)", color: "white" }
                          : { color: "var(--sidebar-foreground)" }
                      }
                      title={sidebarCollapsed ? item.label : undefined}
                    >
                      <Icon className="w-4 h-4 flex-shrink-0" />
                      {!sidebarCollapsed && (
                        <span className="truncate">{item.label}</span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Collapse toggle */}
      <div
        className="p-3 border-t"
        style={{ borderColor: "var(--sidebar-border)" }}
      >
        <button
          onClick={toggleSidebar}
          className={cn(
            "w-full flex items-center gap-2 px-2 py-2 rounded-md text-sm transition-colors hover:bg-[var(--sidebar-accent)]",
            sidebarCollapsed && "justify-center"
          )}
          style={{ color: "var(--muted-foreground)" }}
        >
          <ChevronLeft
            className={cn(
              "w-4 h-4 transition-transform duration-300",
              sidebarCollapsed && "rotate-180"
            )}
          />
          {!sidebarCollapsed && <span>Collapse</span>}
        </button>
      </div>
    </aside>
  );
}
