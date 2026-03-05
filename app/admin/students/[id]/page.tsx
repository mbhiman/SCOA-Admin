import { ArrowLeft, Award, ClipboardList, BookOpen, Phone, Mail, Calendar } from "lucide-react";
import Link from "next/link";

export const metadata = { title: "Student Profile" };

export default function StudentProfilePage({ params }: { params: { id: string } }) {
  const student = {
    id: params.id,
    name: "Rahul Verma",
    mobile: "+91 98000 12345",
    email: "rahul.verma@example.com",
    enrolledAt: "15 Jan 2024",
    dob: "12 Mar 1992",
    course: "Supply Chain 101",
    status: "active",
    examAttempts: [
      { id: 1, date: "20 Jan 2024", score: 78, result: "pass", retryEligible: false },
      { id: 2, date: "05 Dec 2023", score: 54, result: "fail", retryEligible: false },
    ],
    certificates: [
      { id: "CERT-001234", course: "Supply Chain 101", issuedAt: "25 Jan 2024" },
    ],
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/students"
          className="flex items-center gap-2 text-sm hover:underline"
          style={{ color: "var(--muted-foreground)" }}
        >
          <ArrowLeft className="w-4 h-4" /> Back to Students
        </Link>
      </div>

      {/* Profile Header */}
      <div
        className="rounded-xl border p-6"
        style={{ background: "var(--card)", borderColor: "var(--border)" }}
      >
        <div className="flex items-start gap-5">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold text-white flex-shrink-0"
            style={{ background: "var(--primary)" }}
          >
            {student.name.split(" ").map((n) => n[0]).join("")}
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-xl font-bold" style={{ color: "var(--foreground)" }}>
                  {student.name}
                </h1>
                <p className="text-sm mt-0.5 font-mono" style={{ color: "var(--muted-foreground)" }}>
                  {student.id}
                </p>
              </div>
              <span
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
                style={{ background: "#ecfdf5", color: "#10b981" }}
              >
                Active
              </span>
            </div>
            <div className="flex flex-wrap gap-4 mt-4">
              {[
                { icon: Phone, label: student.mobile },
                { icon: Mail, label: student.email },
                { icon: BookOpen, label: student.course },
                { icon: Calendar, label: `Enrolled ${student.enrolledAt}` },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-sm" style={{ color: "var(--muted-foreground)" }}>
                  <Icon className="w-4 h-4" />
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Exam Attempts */}
        <div
          className="rounded-xl border"
          style={{ background: "var(--card)", borderColor: "var(--border)" }}
        >
          <div
            className="flex items-center gap-2 px-5 py-4 border-b"
            style={{ borderColor: "var(--border)" }}
          >
            <ClipboardList className="w-4 h-4" style={{ color: "var(--primary)" }} />
            <h3 className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
              Exam Attempts
            </h3>
          </div>
          <div className="p-5 space-y-3">
            {student.examAttempts.map((attempt) => (
              <div
                key={attempt.id}
                className="flex items-center justify-between p-3 rounded-lg border"
                style={{ borderColor: "var(--border)" }}
              >
                <div>
                  <p className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
                    Attempt #{attempt.id}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>
                    {attempt.date}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold" style={{ color: "var(--foreground)" }}>
                    {attempt.score}%
                  </p>
                  <span
                    className="text-[11px] font-medium"
                    style={{ color: attempt.result === "pass" ? "#10b981" : "#ef4444" }}
                  >
                    {attempt.result.toUpperCase()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certificates */}
        <div
          className="rounded-xl border"
          style={{ background: "var(--card)", borderColor: "var(--border)" }}
        >
          <div
            className="flex items-center justify-between px-5 py-4 border-b"
            style={{ borderColor: "var(--border)" }}
          >
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4" style={{ color: "var(--primary)" }} />
              <h3 className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
                Certificates
              </h3>
            </div>
            <button
              className="text-xs font-medium px-3 py-1.5 rounded-md border hover:bg-[var(--muted)] transition-colors"
              style={{ borderColor: "var(--border)", color: "var(--foreground)" }}
            >
              Re-issue
            </button>
          </div>
          <div className="p-5 space-y-3">
            {student.certificates.map((cert) => (
              <div
                key={cert.id}
                className="flex items-center justify-between p-3 rounded-lg border"
                style={{ borderColor: "var(--border)", background: "#ecfdf5" }}
              >
                <div>
                  <p className="text-sm font-medium" style={{ color: "#065f46" }}>
                    {cert.course}
                  </p>
                  <p className="text-xs mt-0.5 font-mono" style={{ color: "#047857" }}>
                    {cert.id}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: "#059669" }}>
                    Issued {cert.issuedAt}
                  </p>
                </div>
                <button
                  className="text-xs font-medium px-3 py-1.5 rounded-md text-white"
                  style={{ background: "#10b981" }}
                >
                  Download
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
