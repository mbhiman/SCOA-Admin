"use client";

import { useEffect, useCallback } from "react";
import { useUIStore } from "@/store/ui-store";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard, Users, BookOpen, HelpCircle,
  ClipboardList, Award, BarChart3, Shield, Key, ScrollText, Settings,
  Search, X
} from "lucide-react";

const commands = [
  { id: "dashboard", label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard, group: "Navigation" },
  { id: "students", label: "Students", href: "/admin/students", icon: Users, group: "Navigation" },
  { id: "courses", label: "Courses", href: "/admin/courses", icon: BookOpen, group: "Navigation" },
  { id: "questions", label: "Question Bank", href: "/admin/questions", icon: HelpCircle, group: "Navigation" },
  { id: "exams", label: "Exams", href: "/admin/exams", icon: ClipboardList, group: "Navigation" },
  { id: "certificates", label: "Certificates", href: "/admin/certificates", icon: Award, group: "Navigation" },
  { id: "analytics", label: "Analytics", href: "/admin/analytics", icon: BarChart3, group: "Navigation" },
  { id: "admins", label: "Admin Management", href: "/admin/admins", icon: Shield, group: "Administration" },
  { id: "roles", label: "Roles & Permissions", href: "/admin/roles", icon: Key, group: "Administration" },
  { id: "audit-logs", label: "Audit Logs", href: "/admin/audit-logs", icon: ScrollText, group: "Administration" },
  { id: "settings", label: "Settings", href: "/admin/settings", icon: Settings, group: "Administration" },
];

export function CommandPalette() {
  const { commandOpen, setCommandOpen, commandQuery, setCommandQuery } = useUIStore();
  const router = useRouter();

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCommandOpen(!commandOpen);
      }
      if (e.key === "Escape") setCommandOpen(false);
    },
    [commandOpen, setCommandOpen]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const filtered = commands.filter((c) =>
    c.label.toLowerCase().includes(commandQuery.toLowerCase())
  );

  const grouped = filtered.reduce<Record<string, typeof commands>>((acc, cmd) => {
    if (!acc[cmd.group]) acc[cmd.group] = [];
    acc[cmd.group].push(cmd);
    return acc;
  }, {});

  if (!commandOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-24 px-4"
      style={{ background: "rgba(0,0,0,0.5)" }}
      onClick={() => setCommandOpen(false)}
    >
      <div
        className="w-full max-w-lg rounded-2xl border shadow-2xl overflow-hidden"
        style={{ background: "var(--popover)", borderColor: "var(--border)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search input */}
        <div
          className="flex items-center gap-3 px-4 py-3 border-b"
          style={{ borderColor: "var(--border)" }}
        >
          <Search className="w-4 h-4 flex-shrink-0" style={{ color: "var(--muted-foreground)" }} />
          <input
            autoFocus
            className="flex-1 bg-transparent text-sm outline-none"
            style={{ color: "var(--foreground)" }}
            placeholder="Search commands, pages..."
            value={commandQuery}
            onChange={(e) => setCommandQuery(e.target.value)}
          />
          <button onClick={() => setCommandOpen(false)}>
            <X className="w-4 h-4" style={{ color: "var(--muted-foreground)" }} />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-80 overflow-y-auto py-2">
          {Object.entries(grouped).map(([group, items]) => (
            <div key={group}>
              <p
                className="px-4 py-2 text-[10px] font-semibold uppercase tracking-widest"
                style={{ color: "var(--muted-foreground)" }}
              >
                {group}
              </p>
              {items.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-[var(--muted)] transition-colors"
                    style={{ color: "var(--foreground)" }}
                    onClick={() => {
                      router.push(item.href);
                      setCommandOpen(false);
                      setCommandQuery("");
                    }}
                  >
                    <Icon className="w-4 h-4" style={{ color: "var(--muted-foreground)" }} />
                    {item.label}
                  </button>
                );
              })}
            </div>
          ))}
          {filtered.length === 0 && (
            <p
              className="px-4 py-8 text-sm text-center"
              style={{ color: "var(--muted-foreground)" }}
            >
              No results found.
            </p>
          )}
        </div>

        {/* Footer */}
        <div
          className="flex items-center gap-4 px-4 py-2 border-t text-[11px]"
          style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}
        >
          <span><kbd className="font-mono">↑↓</kbd> navigate</span>
          <span><kbd className="font-mono">↵</kbd> select</span>
          <span><kbd className="font-mono">esc</kbd> close</span>
        </div>
      </div>
    </div>
  );
}
