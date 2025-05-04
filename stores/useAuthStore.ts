import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { User } from "@/types";

type AuthState = {
  token: string | null;
  loading: boolean;
  user: User | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  isTokenExpired: () => boolean;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      loading: false,
      login: (token: string, user: User) => set({ token, user }),
      logout: () => set({ token: null, user: null }),
      isTokenExpired: () => {
        const t = get().token;
        if (!t) return true;
        try {
          const { exp } = jwtDecode<{ exp: number }>(t);
          return exp * 1000 < Date.now();
        } catch {
          return true;
        }
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ token: state.token }),
    }
  )
);
