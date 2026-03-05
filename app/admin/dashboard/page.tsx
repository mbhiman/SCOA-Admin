import { Suspense } from "react";
import { KPICards } from "@/components/dashboard/kpi-cards";
import { StudentGrowthChart } from "@/components/dashboard/student-growth-chart";
import { CourseDistributionChart } from "@/components/dashboard/course-distribution-chart";
import { ExamPassFailChart } from "@/components/dashboard/exam-pass-fail-chart";
import { RecentActivityTable } from "@/components/dashboard/recent-activity-table";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { DailyRegistrationChart } from "@/components/dashboard/daily-registration-chart";

export const metadata = { title: "Dashboard" };

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>
          Dashboard
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--muted-foreground)" }}>
          Welcome back, Super Admin. Here&apos;s what&apos;s happening today.
        </p>
      </div>

      {/* KPI Cards */}
      <Suspense fallback={<KPICardsSkeleton />}>
        <KPICards />
      </Suspense>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Suspense fallback={<ChartSkeleton />}>
            <StudentGrowthChart />
          </Suspense>
        </div>
        <div>
          <Suspense fallback={<ChartSkeleton />}>
            <CourseDistributionChart />
          </Suspense>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Suspense fallback={<ChartSkeleton />}>
          <ExamPassFailChart />
        </Suspense>
        <Suspense fallback={<ChartSkeleton />}>
          <DailyRegistrationChart />
        </Suspense>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Suspense fallback={<TableSkeleton />}>
            <RecentActivityTable />
          </Suspense>
        </div>
        <div>
          <QuickActions />
        </div>
      </div>
    </div>
  );
}

function KPICardsSkeleton() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="h-28 rounded-xl border animate-pulse"
          style={{ background: "var(--muted)", borderColor: "var(--border)" }}
        />
      ))}
    </div>
  );
}

function ChartSkeleton() {
  return (
    <div
      className="h-72 rounded-xl border animate-pulse"
      style={{ background: "var(--muted)", borderColor: "var(--border)" }}
    />
  );
}

function TableSkeleton() {
  return (
    <div
      className="h-80 rounded-xl border animate-pulse"
      style={{ background: "var(--muted)", borderColor: "var(--border)" }}
    />
  );
}
