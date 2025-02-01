import { 
  createContext, 
  ReactNode,
  useCallback,
  useContext,
  useState
} from "react";

// Define user type
type User = {
  id: string;
  name: string;
  email: string;
} | null;

// Create context with initial state
const AuthContext = createContext<{
  user: User;
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}>({
  user: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

// Auth provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(null);

  const login = useCallback(() => {
    // Simulate login - this would make an API call
    setUser({
      id: '1',
      name: 'John Doe',
      email: 'john@example.com'
    });
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider 
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};