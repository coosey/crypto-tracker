import { useUserStore } from 'stores';
import { LoginButton } from 'components/buttons/login';
import { SignedInUser } from 'components/buttons/signed-in-user';

export const SignInComponent = () => {
  const { logout, reset } = useUserStore();
  const user = useUserStore((state) => state.user);

  const handleLogout = async () => {
    await logout();
    reset();
  };

  return <div>{user ? <SignedInUser handleLogout={handleLogout} /> : <LoginButton />}</div>;
};
