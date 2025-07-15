import { useAuthStore, useUserStore } from 'stores';
import { LoginButton } from 'components/buttons/login';
import { SignedInUser } from 'components/buttons/signed-in-user';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

export const SignInComponent = () => {
  const { logout } = useAuthStore();
  const { user } = useUserStore();
  const router = useRouter();

  // Check if user authenticated email verification
  const isUserEmailVerified = user?.emailVerified;

  const handleProfileClick = useCallback(() => {
    if (!isUserEmailVerified && router.pathname !== '/verify') { 
      router.push('/verify');
    } else if (isUserEmailVerified && router.pathname !== '/account') {
      router.push('/account');
    }
  }, [router, isUserEmailVerified]);

  const handleLogoutClick = useCallback(async () => {
    try {
      await logout();
      if (router.pathname !== '/') {
        router.push('/');
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }, [logout, router]);

  return (
    <div>
      {user ? (
        <SignedInUser handleProfile={handleProfileClick} handleLogout={handleLogoutClick} userEmail={user?.email} />
      ) : (
        <LoginButton />
      )}
    </div>
  );
};
