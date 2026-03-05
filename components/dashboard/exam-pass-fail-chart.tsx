"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const data = [
  { course: "SC-101", pass: 840, fail: 160 },
  { course: "WH-201", pass: 720, fail: 280 },
  { course: "LG-301", pass: 910, fail: 90 },
  { course: "QM-102", pass: 650, fail: 350 },
  { course: "SC-202", pass: 780, fail: 220 },
  { course: "LG-401", pass: 860, fail: 140 },
];

export function ExamPassFailChart() {
  return (
    <div
      className="rounded-xl border p-5"
      style={{ background: "var(--card)", borderColor: "var(--border)" }}
    >
      <div className="mb-4">
        <h3 className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
          Pass vs Fail Rate
        </h3>
        <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>
          Exam outcomes by course (last 30 days)
        </p>
      </div>
      <div className="h-52">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: 0 }} barSize={16}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis
              dataKey="course"
              tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                background: "var(--popover)",
                border: "1px solid var(--border)",
                borderRadius: "8px",
                fontSize: "12px",
                color: "var(--foreground)",
              }}
            />
            <Legend
              iconType="square"
              iconSize={8}
              formatter={(v) => (
                <span style={{ fontSize: "11px", color: "var(--muted-foreground)" }}>{v}</span>
              )}
            />
            <Bar dataKey="pass" name="Pass" fill="#10b981" radius={[4, 4, 0, 0]} />
            <Bar dataKey="fail" name="Fail" fill="#ef4444" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
