import { create } from "zustand";

type Role = "super_admin" | "admin" | "analyst" | "viewer";

interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: Role;
}

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  sessionExpiry: Date | null;
  setUser: (user: AuthUser) => void;
  clearUser: () => void;
  refreshSession: () => void;
}

const SESSION_DURATION_MINUTES = 30;

export const useAuthStore = create<AuthState>((set) => ({
  user: {
    id: "ADM-001",
    name: "Super Admin",
    email: "admin@scoa.flipkart.com",
    role: "super_admin",
  },
  isAuthenticated: true,
  sessionExpiry: new Date(Date.now() + SESSION_DURATION_MINUTES * 60 * 1000),
  setUser: (user) =>
    set({
      user,
      isAuthenticated: true,
      sessionExpiry: new Date(
        Date.now() + SESSION_DURATION_MINUTES * 60 * 1000
      ),
    }),
  clearUser: () =>
    set({ user: null, isAuthenticated: false, sessionExpiry: null }),
  refreshSession: () =>
    set({
      sessionExpiry: new Date(
        Date.now() + SESSION_DURATION_MINUTES * 60 * 1000
      ),
    }),
}));
