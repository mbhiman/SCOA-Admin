"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

const data = [
  { name: "Supply Chain", value: 38 },
  { name: "Warehousing", value: 27 },
  { name: "Logistics", value: 18 },
  { name: "Quality Mgmt", value: 10 },
  { name: "Others", value: 7 },
];

const COLORS = ["#f97316", "#3b82f6", "#10b981", "#8b5cf6", "#f59e0b"];

export function CourseDistributionChart() {
  return (
    <div
      className="rounded-xl border p-5 h-full"
      style={{ background: "var(--card)", borderColor: "var(--border)" }}
    >
      <div className="mb-4">
        <h3 className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
          Course Distribution
        </h3>
        <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>
          Enrollment by category
        </p>
      </div>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={75}
              paddingAngle={3}
              dataKey="value"
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: "var(--popover)",
                border: "1px solid var(--border)",
                borderRadius: "8px",
                fontSize: "12px",
                color: "var(--foreground)",
              }}
              formatter={(v: number) => [`${v}%`, ""]}
            />
            <Legend
              iconType="circle"
              iconSize={8}
              formatter={(v) => (
                <span style={{ fontSize: "11px", color: "var(--muted-foreground)" }}>{v}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
