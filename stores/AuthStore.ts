import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import {
  loginWithEmail,
  registerWithEmail,
  logout as firebaseLogout,
  onAuthChange,
  loginWithGoogle
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
  emailVerification?: () => Promise<void>;
  clearError?: () => void;
  reset?: () => void;
}

const initialState: AuthStoreState = {
  isLoading: false,
  error: '',
  isHydrated: false,
};

export const useAuthStore = create(
  persist<AuthStoreState & AuthStoreActions>(
    (set, get) => ({
      error: '',
      isLoading: false,
      setError: (error) => set({ error: error }),
      clearError: () => set({ error: null }),
      initialize: async () => {
        if (get().isHydrated) return;
        set({ isLoading: true });

        const unsubscribe = onAuthChange((firebaseUser) => {
          if (firebaseUser) {
            useUserStore.getState().setUser(firebaseUser);
            set({ isLoading: false, isHydrated: true });
          } else {
            useUserStore.getState().clearUser();
            set({ isLoading: false, isHydrated: true });
          }
        })
        return unsubscribe;
      },
      // LOGIN HANDLER
      login: async (email, password) => {
        set((state) => ({ ...state, isLoading: true, error: null, isHydrated: true }));
        try {
          await loginWithEmail(email, password);
          set((state) => ({ ...state, isLoading: false, error: null }));
        } catch (error) {
          console.error('Login error: ', error.code);
          const errorMessage = firebaseErrorHandler(error.code);
          set((state) => ({
            ...state,
            error: errorMessage,
            isLoading: false
          }));
          return { error: errorMessage, success: false };
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
          console.error('Registration error: ', error.code);
          const errorMessage = firebaseErrorHandler(error.code);
          set((state) => ({
            ...state,
            error: errorMessage,
            isLoading: false
          }));
          return { error: errorMessage, success: false };
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
          console.error('Google Login error: ', error);
          const errorMessage = firebaseErrorHandler(error.code);
          set((state) => ({
            ...state,
            error: errorMessage,
            isLoading: false
          }));
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
          const errorMessage = firebaseErrorHandler(error.code);
          set((state) => ({
            ...state,
            error: errorMessage,
          }));
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
      // partialize: (state) => ({
        // user: state.user,
        // isAuthenticated: state.isAuthenticated,
        // error: state.error,
        // isLoading: state.isLoading,
      // })
    },
  )
);