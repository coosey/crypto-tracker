import { useUserStore } from 'stores';
import { LoginButton } from 'components/buttons/login';
import { SignedInUser } from 'components/buttons/signed-in-user';
import { useRouter } from 'next/router';

export const SignInComponent = () => {
  const { logout, reset, user } = useUserStore();
  const router = useRouter();

  // Check if user authenticated email verification
  const isUserEmailVerified = user?.emailVerified;

  const handleProfileClick = () => {
    if (!isUserEmailVerified) router.push('/verify');
    else alert('Email verified, profile clicked'); // TODO: replace with actual profile page navigation 
  }

  const handleLogoutClick = async () => {
    await logout();
    reset();
  };

  return <div>{user ? <SignedInUser handleProfile={handleProfileClick} handleLogout={handleLogoutClick} /> : <LoginButton />}</div>;
};
