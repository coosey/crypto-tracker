import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import {
  loginWithEmail,
  registerWithEmail,
  logout as firebaseLogout,
  onAuthChange,
  loginWithGoogle
} from 'libs/services/authenticate';
import { Unsubscribe, User } from 'firebase/auth';

interface UserStore {
  initialize?: () => Promise<Unsubscribe>;
  user: User | null;
  isAuthenticated: boolean;
  isLoading?: boolean;
  error?: any;
  login?: (email: string, password: string) => Promise<void>;
  logout?: () => Promise<void>;
  setUser?: (user: User) => void;
  clearError?: () => void;
  isHydrated?: boolean;
  googleLogin?: () => Promise<void>;
  register?: (email: string, password: string) => Promise<void>;
  emailVerification?: () => Promise<void>;
  reset?: () => void;
}

const initialState: UserStore = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  isHydrated: false,
};

export const useUserStore = create(
  persist<UserStore>(
    (set, get) => ({
      user: null,
      error: null,
      isAuthenticated: false,
      isLoading: false,
      setUser: (user: User) => set({ user, isAuthenticated: true }),
      clearError: () => set({ error: null }),
      initialize: async () => {
        if (get().isHydrated) return;

        set({ isLoading: true });

        const unsubscribe = onAuthChange((firebaseUser) => {
          if (firebaseUser) {
            set({ user: firebaseUser, isAuthenticated: true, isLoading: false, isHydrated: true });
          } else {
            set({ user: null, isAuthenticated: false, isLoading: false, isHydrated: true });
          }
        })
        return unsubscribe;
      },
      // LOGIN HANDLER
      login: async (email, password) => {
        set({ isLoading: true, error: null, isHydrated: true });
        try {
          await loginWithEmail(email, password);
        } catch (error) {
          set({ error: error, isLoading: false, isHydrated: true });
        }
      },
      // REGISTER HANDLER
      register: async (email, password) => {
        set({ isLoading: true, error: null, isHydrated: true });
        try {
          await registerWithEmail(email, password);
        } catch (error) {
          set({ error: error, isLoading: false, isHydrated: true });
          console.error('Error: ', error);
        }
      },
      // GOOGLE LOGIN HANDLER
      googleLogin: async () => {
        set({ isLoading: true, error: null, isHydrated: true });
        try {
          await loginWithGoogle();
        } catch (error) {
          set({ error: (error as Error).message, isLoading: false, isHydrated: true });
        }
      },
      // LOGOUT HANDLER
      logout: async () => {
        set({ isLoading: true });
        try {
          await firebaseLogout();
          // set({ user: null, isAuthenticated: false, isHydrated: true });
        } catch (error) {
          set({ error: (error as Error).message });
        } finally {
          set({ isLoading: false, isHydrated: true });
        }
      },
      reset: () => {
        set(initialState)
      },
    }),
    {
      name: 'user-store',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        isLoading: state.isLoading,
        error: state.error,
      })
    },
  )
);