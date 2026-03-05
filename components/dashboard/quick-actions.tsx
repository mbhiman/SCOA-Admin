"use client";

import { PlusCircle, UserPlus, Upload, Download } from "lucide-react";
import Link from "next/link";

const actions = [
  {
    label: "Create Course",
    description: "Add a new training course",
    icon: PlusCircle,
    href: "/admin/courses",
    color: "#f97316",
    bg: "#fff7ed",
  },
  {
    label: "Add Student",
    description: "Register a new student",
    icon: UserPlus,
    href: "/admin/students",
    color: "#3b82f6",
    bg: "#eff6ff",
  },
  {
    label: "Upload Questions",
    description: "Bulk import question bank",
    icon: Upload,
    href: "/admin/questions",
    color: "#10b981",
    bg: "#ecfdf5",
  },
  {
    label: "Generate Report",
    description: "Export analytics report",
    icon: Download,
    href: "/admin/analytics",
    color: "#8b5cf6",
    bg: "#f5f3ff",
  },
];

export function QuickActions() {
  return (
    <div
      className="rounded-xl border"
      style={{ background: "var(--card)", borderColor: "var(--border)" }}
    >
      <div
        className="px-5 py-4 border-b"
        style={{ borderColor: "var(--border)" }}
      >
        <h3 className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
          Quick Actions
        </h3>
        <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>
          Common admin tasks
        </p>
      </div>
      <div className="p-4 space-y-2">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <Link
              key={action.label}
              href={action.href}
              className="flex items-center gap-3 p-3 rounded-lg border transition-all hover:shadow-sm hover:border-[var(--ring)]"
              style={{ borderColor: "var(--border)" }}
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: action.bg }}
              >
                <Icon className="w-4 h-4" style={{ color: action.color }} />
              </div>
              <div>
                <p className="text-sm font-medium leading-none" style={{ color: "var(--foreground)" }}>
                  {action.label}
                </p>
                <p className="text-[11px] mt-1" style={{ color: "var(--muted-foreground)" }}>
                  {action.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
