"use client";

import { Users, BookOpen, TrendingUp, Award, ArrowUp, ArrowDown } from "lucide-react";

const kpis = [
  {
    label: "Total Students",
    value: "2,48,391",
    change: "+12.5%",
    trend: "up",
    icon: Users,
    color: "#3b82f6",
    bg: "#eff6ff",
    darkBg: "#172033",
  },
  {
    label: "Total Courses",
    value: "142",
    change: "+3",
    trend: "up",
    icon: BookOpen,
    color: "#10b981",
    bg: "#ecfdf5",
    darkBg: "#0d2818",
  },
  {
    label: "Active Enrollments",
    value: "18,204",
    change: "-2.1%",
    trend: "down",
    icon: TrendingUp,
    color: "#f97316",
    bg: "#fff7ed",
    darkBg: "#2a1505",
  },
  {
    label: "Certificates Issued",
    value: "1,04,872",
    change: "+8.3%",
    trend: "up",
    icon: Award,
    color: "#8b5cf6",
    bg: "#f5f3ff",
    darkBg: "#1e1033",
  },
];

export function KPICards() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map((kpi) => {
        const Icon = kpi.icon;
        const isUp = kpi.trend === "up";
        return (
          <div
            key={kpi.label}
            className="rounded-xl border p-5 transition-all hover:shadow-md"
            style={{
              background: "var(--card)",
              borderColor: "var(--border)",
            }}
          >
            <div className="flex items-start justify-between mb-3">
              <p className="text-sm font-medium" style={{ color: "var(--muted-foreground)" }}>
                {kpi.label}
              </p>
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{ background: kpi.bg }}
              >
                <Icon className="w-4.5 h-4.5" style={{ color: kpi.color }} />
              </div>
            </div>
            <p className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>
              {kpi.value}
            </p>
            <div className="flex items-center gap-1 mt-1">
              {isUp ? (
                <ArrowUp className="w-3 h-3" style={{ color: "#10b981" }} />
              ) : (
                <ArrowDown className="w-3 h-3" style={{ color: "#ef4444" }} />
              )}
              <span
                className="text-xs font-medium"
                style={{ color: isUp ? "#10b981" : "#ef4444" }}
              >
                {kpi.change}
              </span>
              <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                vs last month
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
