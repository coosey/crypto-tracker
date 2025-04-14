import { create } from 'zustand';
import { Unsubscribe, User } from "firebase/auth";
import { persist } from "zustand/middleware";
import { onAuthChange } from 'libs/services/authenticate';

type UserStoreState = {
  user: User | null;
  isAuthenticated?: boolean;
  isHydrated?: boolean;
};

type UserStoreActions = {
  initialize?: () => Promise<Unsubscribe>;
  setUser?: (user: User) => void;
  clearUser?: () => void;
};

const initialUserState: UserStoreState = {
  user: null,
  isAuthenticated: false,
  isHydrated: false,
};

export const useUserStore = create(
  persist<UserStoreState & UserStoreActions>(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      initialize: async () => {
        if (get().isHydrated) return;

        const unsubscribe = onAuthChange((firebaseUser) => {
          if (firebaseUser) {
            set({ user: firebaseUser, isAuthenticated: true, isHydrated: true });
          } else {
            set({ user: null, isAuthenticated: false, isHydrated: true });
          }
        })
        return unsubscribe;
      },
      setUser: (user: User) => set({ user: user, isAuthenticated: true, isHydrated: true }),
      clearUser: () => set({ user: null, isAuthenticated: false, isHydrated: true }),
      reset: () => {
        set(initialUserState)
      },
    }),
    {
      name: 'user-store',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        isHydrated: state.isHydrated,
      })
    },
  )
);