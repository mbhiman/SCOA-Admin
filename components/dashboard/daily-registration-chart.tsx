"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { day: "Mon", registrations: 342 },
  { day: "Tue", registrations: 489 },
  { day: "Wed", registrations: 421 },
  { day: "Thu", registrations: 612 },
  { day: "Fri", registrations: 538 },
  { day: "Sat", registrations: 267 },
  { day: "Sun", registrations: 194 },
];

export function DailyRegistrationChart() {
  return (
    <div
      className="rounded-xl border p-5"
      style={{ background: "var(--card)", borderColor: "var(--border)" }}
    >
      <div className="mb-4">
        <h3 className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
          Daily Registrations
        </h3>
        <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>
          New student sign-ups this week
        </p>
      </div>
      <div className="h-52">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: 0 }} barSize={28}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis
              dataKey="day"
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
              formatter={(v: number) => [v, "Registrations"]}
            />
            <Bar dataKey="registrations" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
