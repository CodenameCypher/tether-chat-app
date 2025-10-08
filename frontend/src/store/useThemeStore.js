import { create } from "zustand";

export const useThemeStore = create((set) => ({
  selectedTheme: localStorage.getItem("user-theme") || "dark",

  selectTheme: (theme) => {
    localStorage.setItem("user-theme", theme);
    set({ selectedTheme: theme });
  },
}));
