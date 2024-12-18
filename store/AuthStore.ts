import { create } from "zustand";

interface Auth {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
}

export const useAuthStore = create<Auth>((set, get) => ({
  accessToken: "",
  setAccessToken: (token) => set(() => ({ accessToken: token })),
}));
