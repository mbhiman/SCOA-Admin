import { create } from "zustand";

interface FilterState {
  studentFilters: {
    status?: string;
    course?: string;
    dateFrom?: string;
    dateTo?: string;
  };
  examFilters: {
    result?: string;
    course?: string;
  };
  setStudentFilters: (filters: Partial<FilterState["studentFilters"]>) => void;
  setExamFilters: (filters: Partial<FilterState["examFilters"]>) => void;
  resetStudentFilters: () => void;
  resetExamFilters: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  studentFilters: {},
  examFilters: {},
  setStudentFilters: (filters) =>
    set((state) => ({
      studentFilters: { ...state.studentFilters, ...filters },
    })),
  setExamFilters: (filters) =>
    set((state) => ({
      examFilters: { ...state.examFilters, ...filters },
    })),
  resetStudentFilters: () => set({ studentFilters: {} }),
  resetExamFilters: () => set({ examFilters: {} }),
}));
