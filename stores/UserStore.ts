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
import { firebaseErrorHandler } from 'libs/firebase/errors';

interface AuthResponse {
  error: string | null;
  success: boolean;
}

interface UserStore {
  initialize?: () => Promise<Unsubscribe>;
  user: User | null;
  isAuthenticated: boolean;
  isLoading?: boolean;
  error?: string | null;
  isHydrated?: boolean;
  setIsLoading?: (loadingState: boolean) => void;
  login?: (email: string, password: string) => Promise<AuthResponse>;
  logout?: () => Promise<void>;
  setUser?: (user: User) => void;
  clearError?: () => void;
  googleLogin?: () => Promise<void>;
  register?: (email: string, password: string) => Promise<AuthResponse>;
  emailVerification?: () => Promise<void>;
  reset?: () => void;
}

const initialState: UserStore = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: '',
  isHydrated: false,
};

export const useUserStore = create(
  persist<UserStore>(
    (set, get) => ({
      user: null,
      error: '',
      isAuthenticated: false,
      isLoading: false,
      setError: (error) => set({ error: error }),
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
        set({ isLoading: true });
        try {
          await firebaseLogout();
          set((state) => ({ ...state, user: null, isAuthenticated: false, isHydrated: true }));
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
      name: 'user-store',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        // error: state.error,
        // isLoading: state.isLoading,
      })
    },
  )
);