type Role = "super_admin" | "admin" | "analyst" | "viewer";

type Permission =
  | "manage:students"
  | "view:students"
  | "manage:courses"
  | "view:courses"
  | "manage:questions"
  | "manage:exams"
  | "view:exams"
  | "manage:certificates"
  | "view:certificates"
  | "manage:admins"
  | "manage:roles"
  | "view:audit_logs"
  | "export:data"
  | "manage:settings";

const rolePermissions: Record<Role, Permission[]> = {
  super_admin: [
    "manage:students", "view:students", "manage:courses", "view:courses",
    "manage:questions", "manage:exams", "view:exams",
    "manage:certificates", "view:certificates",
    "manage:admins", "manage:roles", "view:audit_logs",
    "export:data", "manage:settings",
  ],
  admin: [
    "manage:students", "view:students", "manage:courses", "view:courses",
    "manage:questions", "manage:exams", "view:exams",
    "manage:certificates", "view:certificates",
    "view:audit_logs", "export:data",
  ],
  analyst: [
    "view:students", "view:courses", "view:exams",
    "view:certificates", "export:data",
  ],
  viewer: ["view:students", "view:courses", "view:exams", "view:certificates"],
};

export function hasPermission(role: Role, permission: Permission): boolean {
  return rolePermissions[role]?.includes(permission) ?? false;
}

export function getPermissions(role: Role): Permission[] {
  return rolePermissions[role] ?? [];
}
