// Core domain types for SCOA Training Platform

export type Role = "super_admin" | "admin" | "analyst" | "viewer";

export interface Student {
  id: string;
  name: string;
  mobile: string;
  email: string;
  dob?: string;
  status: "active" | "inactive" | "suspended";
  createdAt: string;
  updatedAt: string;
}

export interface Course {
  id: string;
  name: string;
  category: string;
  description?: string;
  passingScore: number;
  retryDays: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Enrollment {
  id: string;
  studentId: string;
  courseId: string;
  enrolledAt: string;
  status: "enrolled" | "completed" | "dropped";
}

export interface Question {
  id: string;
  courseId: string;
  text: string;
  type: "MCQ" | "true_false";
  difficulty: "easy" | "medium" | "hard";
  options: { id: string; text: string }[];
  correctOptionId: string;
  createdAt: string;
}

export interface ExamAttempt {
  id: string;
  studentId: string;
  courseId: string;
  enrollmentId: string;
  score: number;
  passingScore: number;
  result: "pass" | "fail";
  attemptNumber: number;
  nextEligibleDate?: string;
  takenAt: string;
}

export interface Certificate {
  id: string;
  certNumber: string;
  studentId: string;
  courseId: string;
  examAttemptId: string;
  issuedAt: string;
  downloadUrl?: string;
  verificationCode: string;
}

export interface Admin {
  id: string;
  name: string;
  email: string;
  role: Role;
  active: boolean;
  lastLoginAt?: string;
  createdAt: string;
}

export interface AuditLog {
  id: string;
  userId: string;
  userType: "admin" | "student";
  action: string;
  ipAddress: string;
  userAgent: string;
  status: "success" | "failed" | "blocked";
  metadata?: Record<string, unknown>;
  createdAt: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ApiError {
  message: string;
  code: string;
  statusCode: number;
}
