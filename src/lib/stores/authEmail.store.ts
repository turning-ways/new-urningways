import { create } from "zustand";

interface AuthEmailStore {
  email: string;
  setEmail: (email: string) => void;
}

export const useAuthEmailStore = create<AuthEmailStore>((set) => ({
  email: "",
  setEmail: (email) => set({ email }),
}));
