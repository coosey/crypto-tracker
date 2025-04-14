import { create } from 'zustand';
import { User } from "firebase/auth";
import { persist } from "zustand/middleware";

type UserStoreState = {
  user: User | null;
  isAuthenticated?: boolean;
};

type UserStoreActions = {
  setUser?: (user: User) => void;
  clearUser?: () => void;
};

const initialUserState: UserStoreState = {
  user: null,
  isAuthenticated: false,
};

export const useUserStore = create(
  persist<UserStoreState & UserStoreActions>(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setUser: (user: User) => set({ user, isAuthenticated: true }),
      clearUser: () => set({ user: null, isAuthenticated: false }),
      reset: () => {
        set(initialUserState)
      },
    }),
    {
      name: 'user-store',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      })
    },
  )
);