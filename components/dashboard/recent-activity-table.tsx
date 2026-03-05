"use client";

import { format } from "date-fns";

type ActivityItem = {
  id: string;
  type: "enrollment" | "exam" | "certificate";
  student: string;
  course: string;
  status: "success" | "failed" | "pending";
  time: Date;
};

const recentActivity: ActivityItem[] = [
  { id: "1", type: "enrollment", student: "Rahul Verma", course: "Supply Chain 101", status: "success", time: new Date(Date.now() - 120000) },
  { id: "2", type: "exam", student: "Priya Sharma", course: "Warehousing 201", status: "failed", time: new Date(Date.now() - 300000) },
  { id: "3", type: "certificate", student: "Amit Kumar", course: "Logistics 301", status: "success", time: new Date(Date.now() - 600000) },
  { id: "4", type: "enrollment", student: "Sneha Patel", course: "Quality Mgmt 102", status: "success", time: new Date(Date.now() - 1200000) },
  { id: "5", type: "exam", student: "Vikram Singh", course: "Supply Chain 202", status: "success", time: new Date(Date.now() - 1800000) },
  { id: "6", type: "certificate", student: "Anjali Gupta", course: "SC-101", status: "pending", time: new Date(Date.now() - 2400000) },
];

const typeLabels = {
  enrollment: { label: "Enrollment", color: "#3b82f6", bg: "#eff6ff" },
  exam: { label: "Exam Attempt", color: "#8b5cf6", bg: "#f5f3ff" },
  certificate: { label: "Certificate", color: "#10b981", bg: "#ecfdf5" },
};

const statusConfig = {
  success: { label: "Success", color: "#10b981", bg: "#ecfdf5" },
  failed: { label: "Failed", color: "#ef4444", bg: "#fef2f2" },
  pending: { label: "Pending", color: "#f59e0b", bg: "#fffbeb" },
};

export function RecentActivityTable() {
  return (
    <div
      className="rounded-xl border"
      style={{ background: "var(--card)", borderColor: "var(--border)" }}
    >
      <div
        className="flex items-center justify-between px-5 py-4 border-b"
        style={{ borderColor: "var(--border)" }}
      >
        <div>
          <h3 className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
            Recent Activity
          </h3>
          <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>
            Latest events across the platform
          </p>
        </div>
        <button className="text-xs font-medium" style={{ color: "var(--primary)" }}>
          View all →
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border)" }}>
              {["Student", "Course", "Event", "Status", "Time"].map((h) => (
                <th
                  key={h}
                  className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {recentActivity.map((item, i) => {
              const typeInfo = typeLabels[item.type];
              const statusInfo = statusConfig[item.status];
              return (
                <tr
                  key={item.id}
                  className="hover:bg-[var(--muted)] transition-colors"
                  style={{
                    borderBottom: i < recentActivity.length - 1 ? "1px solid var(--border)" : "none",
                  }}
                >
                  <td className="px-5 py-3">
                    <span className="font-medium" style={{ color: "var(--foreground)" }}>
                      {item.student}
                    </span>
                  </td>
                  <td className="px-5 py-3" style={{ color: "var(--muted-foreground)" }}>
                    {item.course}
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium"
                      style={{ color: typeInfo.color, background: typeInfo.bg }}
                    >
                      {typeInfo.label}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium"
                      style={{ color: statusInfo.color, background: statusInfo.bg }}
                    >
                      {statusInfo.label}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-xs" style={{ color: "var(--muted-foreground)" }}>
                    {format(item.time, "HH:mm")} today
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
