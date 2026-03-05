import { StudentGrowthChart } from "@/components/dashboard/student-growth-chart";
import { CourseDistributionChart } from "@/components/dashboard/course-distribution-chart";
import { ExamPassFailChart } from "@/components/dashboard/exam-pass-fail-chart";
import { DailyRegistrationChart } from "@/components/dashboard/daily-registration-chart";
import { Download, MapPin } from "lucide-react";

export const metadata = { title: "Analytics" };

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>Analytics</h1>
          <p className="text-sm mt-1" style={{ color: "var(--muted-foreground)" }}>Platform performance metrics and insights.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border hover:bg-[var(--muted)] transition-colors" style={{ borderColor: "var(--border)", color: "var(--foreground)" }}>
          <Download className="w-4 h-4" /> Export Report
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2"><StudentGrowthChart /></div>
        <CourseDistributionChart />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ExamPassFailChart />
        <DailyRegistrationChart />
      </div>

      {/* Geographic Distribution Placeholder */}
      <div className="rounded-xl border p-8 flex flex-col items-center justify-center text-center" style={{ background: "var(--card)", borderColor: "var(--border)", minHeight: "240px" }}>
        <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3" style={{ background: "var(--muted)" }}>
          <MapPin className="w-6 h-6" style={{ color: "var(--muted-foreground)" }} />
        </div>
        <h3 className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>Geographic Distribution</h3>
        <p className="text-sm mt-1 max-w-xs" style={{ color: "var(--muted-foreground)" }}>
          Map visualization showing student distribution across India. Integrate a mapping library like react-simple-maps or Google Maps for live data.
        </p>
        <button className="mt-4 px-4 py-2 text-sm font-medium rounded-lg border hover:bg-[var(--muted)] transition-colors" style={{ borderColor: "var(--border)", color: "var(--foreground)" }}>
          Configure Map
        </button>
      </div>
    </div>
  );
}
