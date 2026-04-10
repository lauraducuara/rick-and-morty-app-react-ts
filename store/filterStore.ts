import { create } from "zustand";
import { Character } from "@/types/character";

type Tab = "characters" | "stats";

interface FilterState {
  search: string;
  status: string;
  setSearch: (value: string) => void;
  setStatus: (value: string) => void;
  reset: () => void;

  selectedCharacter: Character | null;
  openModal: (character: Character) => void;
  closeModal: () => void;

  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  search: "",
  status: "",
  setSearch: (value) => set({ search: value }),
  setStatus: (value) => set({ status: value }),
  reset: () => set({ search: "", status: "" }),

  selectedCharacter: null,
  openModal: (character) => set({ selectedCharacter: character }),
  closeModal: () => set({ selectedCharacter: null }),

  activeTab: "characters",
  setActiveTab: (tab) => set({ activeTab: tab }),
}));