import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("o-chat-theme") || "winter",
  setTheme: (theme) => {
    localStorage.setItem("o-chat-theme", theme);
    set({ theme });
  },
}));
