import { useQuery } from "@tanstack/react-query";

// Hook: fetch students with filters
export function useStudents(filters?: { status?: string; course?: string }) {
  return useQuery({
    queryKey: ["students", filters],
    queryFn: async () => {
      // Replace with actual API call
      // const params = new URLSearchParams(filters as Record<string, string>);
      // const res = await fetch(`/api/admin/students?${params}`);
      // return res.json();
      return { data: [], total: 0 };
    },
    staleTime: 30 * 1000,
  });
}

// Hook: fetch dashboard KPIs
export function useDashboardKPIs() {
  return useQuery({
    queryKey: ["dashboard", "kpis"],
    queryFn: async () => {
      // Replace with actual API call
      return {
        totalStudents: 248391,
        totalCourses: 142,
        activeEnrollments: 18204,
        certificatesIssued: 104872,
      };
    },
    staleTime: 5 * 60 * 1000,
  });
}

// Hook: fetch exam analytics
export function useExamAnalytics(courseId?: string) {
  return useQuery({
    queryKey: ["exams", "analytics", courseId],
    queryFn: async () => {
      return { passRate: 0, failRate: 0, avgScore: 0, totalAttempts: 0 };
    },
  });
}

// Hook: paginated table data
export function usePaginatedData<T>(
  key: string[],
  fetcher: (page: number, pageSize: number) => Promise<{ data: T[]; total: number }>,
  page: number,
  pageSize: number
) {
  return useQuery({
    queryKey: [...key, page, pageSize],
    queryFn: () => fetcher(page, pageSize),
    placeholderData: (prev) => prev,
  });
}
