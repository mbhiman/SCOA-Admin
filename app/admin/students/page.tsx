import { Suspense } from "react";
import { StudentsTable } from "@/features/students/students-table";

export const metadata = { title: "Students" };

export default function StudentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>
            Students
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--muted-foreground)" }}>
            Manage all registered students on the platform.
          </p>
        </div>
      </div>
      <Suspense fallback={<div className="h-96 rounded-xl border animate-pulse" style={{ background: "var(--muted)", borderColor: "var(--border)" }} />}>
        <StudentsTable />
      </Suspense>
    </div>
  );
}
