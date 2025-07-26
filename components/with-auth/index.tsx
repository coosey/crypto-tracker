import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useUserStore } from 'stores';

/**
 * Higher-Order Component: Authentication Wrapper
 * * This component checks if the user is authenticated before rendering the protected route
 * * If the user is not authenticated, they are redirected to a 404 page or login page
 * @param Component
 *
 * @returns `AuthenticatedComponent` - the wrapped component with authentication check or redirects to /404
 */
export function withAuth(Component) {
  return function AuthenticatedComponent(props) {
    const { user } = useUserStore();
    const router = useRouter()
    const isAuthenticated = !!user;

    useEffect(() => {
      if (!isAuthenticated) {
        router.push('/404') // or redirect to login page /login
      }
    }, [isAuthenticated, router])
    
    return isAuthenticated ? <Component {...props} /> : null;
  }
}