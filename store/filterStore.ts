import { create } from "zustand";

interface FilterState {
  search: string;
  status: string;

  setSearch: (value: string) => void;
  setStatus: (value: string) => void;
  reset: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  search: "",
  status: "",

  setSearch: (value) => set({ search: value }),

  setStatus: (value) => set({ status: value }),
  reset: () => set({ search: "", status: "" }),
}));