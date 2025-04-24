import { create } from 'zustand';
import { Unsubscribe, User } from "firebase/auth";
import { persist } from "zustand/middleware";
import { onAuthChange } from 'libs/services/authenticate';
import { auth } from 'libs/firebase';
import { useAuthStore } from './AuthStore';

type UserStoreState = {
  user: User | null;
  favorites?: string[];
  isAuthenticated?: boolean;
  isHydrated?: boolean;
};

type UserStoreActions = {
  initialize?: () => Promise<Unsubscribe>;
  setUser?: (user: User) => void;
  clearUser?: () => void;
  fetchFavorites?: (userId: string) => Promise<void>;
};

const initialUserState: UserStoreState = {
  user: null,
  favorites: [],
  isAuthenticated: false,
  isHydrated: false,
};

export const useUserStore = create(
  persist<UserStoreState & UserStoreActions>(
    (set, get) => ({
      user: null,
      favorites: [],
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

      fetchFavorites: async (userId: string) => {
        const res = await fetch('/api/user/favorites', {
          headers: { Authorization: `Bearer ${userId}` }
        });
        const { favorites } = await res.json();
        set({ favorites });
      },

      reset: () => {
        set(initialUserState)
      },
    }),
    
    {
      name: 'user-store',
      partialize: (state) => ({
        user: state.user,
        favorites: state.favorites,
        isAuthenticated: state.isAuthenticated,
        isHydrated: state.isHydrated,
      })
    },
  )
);

// auth.onAuthStateChanged((user) => {
//   useUserStore.setState({ user });
//   if (user) useUserStore.getState().fetchFavorites(user.uid);
// });