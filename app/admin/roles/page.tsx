import { Shield, Check } from "lucide-react";

export const metadata = { title: "Roles & Permissions" };

const roles = [
  {
    name: "Super Admin",
    description: "Full system access with no restrictions",
    color: "#f97316",
    bg: "#fff7ed",
    permissions: ["View Dashboard", "Manage Students", "Manage Courses", "Manage Questions", "Manage Exams", "Issue Certificates", "Manage Admins", "Manage Roles", "View Audit Logs", "Export Data", "System Settings"],
  },
  {
    name: "Admin",
    description: "Operational control over platform",
    color: "#3b82f6",
    bg: "#eff6ff",
    permissions: ["View Dashboard", "Manage Students", "Manage Courses", "Manage Questions", "Manage Exams", "Issue Certificates", "View Audit Logs", "Export Data"],
  },
  {
    name: "Analyst",
    description: "Read-only analytics and reporting access",
    color: "#8b5cf6",
    bg: "#f5f3ff",
    permissions: ["View Dashboard", "View Students", "View Courses", "View Exams", "Export Data"],
  },
  {
    name: "Viewer",
    description: "View-only access to basic information",
    color: "#6b7280",
    bg: "#f3f4f6",
    permissions: ["View Dashboard", "View Students", "View Courses"],
  },
];

export default function RolesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>Roles & Permissions</h1>
        <p className="text-sm mt-1" style={{ color: "var(--muted-foreground)" }}>Define access levels for different admin roles.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {roles.map((role) => (
          <div key={role.name} className="rounded-xl border p-5" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: role.bg }}>
                <Shield className="w-5 h-5" style={{ color: role.color }} />
              </div>
              <div>
                <h3 className="font-semibold" style={{ color: "var(--foreground)" }}>{role.name}</h3>
                <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>{role.description}</p>
              </div>
            </div>
            <div className="space-y-1.5">
              {role.permissions.map((perm) => (
                <div key={perm} className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5" style={{ color: role.color }} />
                  <span className="text-sm" style={{ color: "var(--foreground)" }}>{perm}</span>
                </div>
              ))}
            </div>
            <button className="mt-4 w-full py-2 text-sm font-medium rounded-lg border transition-colors hover:bg-[var(--muted)]" style={{ borderColor: "var(--border)", color: "var(--foreground)" }}>
              Edit Permissions
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
