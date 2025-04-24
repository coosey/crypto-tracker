import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import {
  loginWithEmail,
  registerWithEmail,
  logout as firebaseLogout,
  onAuthChange,
  loginWithGoogle,
  getCurrentUser
} from 'libs/services/authenticate';
import { Unsubscribe } from 'firebase/auth';
import { firebaseErrorHandler } from 'libs/firebase/errors';
import { useUserStore } from './UserStore';

interface AuthResponse {
  error: string | null;
  success: boolean;
}

type AuthStoreState = {
  isLoading?: boolean;
  error?: string | null;
  isHydrated?: boolean;
};

type AuthStoreActions = {
  initialize?: () => Promise<Unsubscribe>;
  setIsLoading?: (loadingState: boolean) => void;
  login?: (email: string, password: string) => Promise<AuthResponse>;
  logout?: () => Promise<void>;
  googleLogin?: () => Promise<void>;
  register?: (email: string, password: string) => Promise<AuthResponse>;
  emailVerification?: () => Promise<AuthResponse>;
  clearError?: () => void;
  reset?: () => void;
  handleAuthError?: (error) => AuthResponse;
}

const initialState: AuthStoreState = {
  isLoading: false,
  error: '',
  isHydrated: false,
};

export const useAuthStore = create(
  persist<AuthStoreState & AuthStoreActions>(
    (set, get) => ({
      // State
      error: '',
      isLoading: false,
      isHydrated: false,

      // Actions
      setError: (error) => set({ error: error }),
      clearError: () => set({ error: null }),

      handleAuthError(error) {
        console.error('Auth error:', error);
        const errorMessage = firebaseErrorHandler(error.code);
        set({ error: errorMessage, isLoading: false });
        return { error: errorMessage, success: false };
      },

      initialize: async () => {
        if (get().isHydrated) return;
        return new Promise((resolve) => {
          const unsubscribe = onAuthChange((user) => {
            set({ isHydrated: true });
            resolve(unsubscribe);
          });
        });
      },

      // LOGIN HANDLER
      login: async (email, password) => {
        const userStore = useUserStore.getState();
        set((state) => ({ ...state, isLoading: true, error: null, isHydrated: true }));
        try {
          await loginWithEmail(email, password);
          const user = getCurrentUser();
          if (user) userStore.setUser(user);
          set((state) => ({ ...state, isLoading: false, error: null }));
        } catch (error) {
          userStore.clearUser();
          return get().handleAuthError(error);
        }
        return { error: null, success: true };
      },

      // REGISTER HANDLER
      register: async (email, password) => {
        set({ isLoading: true, error: null, isHydrated: true });
        try {
          await registerWithEmail(email, password);
          set((state) => ({ ...state, isLoading: false, error: null }));
        } catch (error) {
          return get().handleAuthError(error);
        }
        return { error: null, success: true };
      },

      // GOOGLE LOGIN HANDLER
      googleLogin: async () => {
        set({ isLoading: true, error: null, isHydrated: true });
        try {
          await loginWithGoogle();
          set((state) => ({ ...state, isLoading: false, error: null }));
        } catch (error) {
          get().handleAuthError(error);
        }
      },

      // LOGOUT HANDLER
      logout: async () => {
        const userStore = useUserStore.getState();
        set({ isLoading: true });
        try {
          await firebaseLogout();
          userStore.clearUser();
          set((state) => ({ ...state, isHydrated: true }));
        } catch (error) {
          get().handleAuthError(error);
        } finally {
          set({ isLoading: false, isHydrated: true });
        }
      },
      reset: () => {
        set(initialState)
      },
    }),
    {
      name: 'auth-store',
      onRehydrateStorage: () => (state) => {
        state?.initialize();
      }
      // partialize: (state) => ({
      // user: state.user,
      // isAuthenticated: state.isAuthenticated,
      // error: state.error,
      // isLoading: state.isLoading,
      // })
    },
  )
);