// store/use-auth-store.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  token: string | null;
  user: string | null;
  setAuth: (token: string, user: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      setAuth: (token, user) => set({ token, user }),
      logout: () => {
        set({ token: null, user: null });
        localStorage.removeItem("auth-storage"); // ล้างข้อมูล
        if (typeof document !== 'undefined') {
          document.cookie = "token=; path=/; max-age=0";
          document.cookie = "role=; path=/; max-age=0";
        }
      },
    }),
    { name: "auth-storage" }
  )
);