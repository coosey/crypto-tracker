import { ActionIcon } from '@mantine/core';
import styles from './index.module.scss';
import { IconUser } from '@tabler/icons-react';
import { useAuth } from 'libs/context/sign-in';

export const SignInComponent = () => {
  const { isAuthenticated, user, login, logout } = useAuth();
  return (
    <div>
      {/** TODO: Currently WIP */}
      {user && <SignedInUser />}
      {!user && <LoginButton />}
    </div>
  );
};

const LoginButton = () => {
  return (
    <div>
      <button className={styles?.['login']}>Login</button>
    </div>
  );
};

const SignedInUser = () => {
  return (
    <ActionIcon
      className={styles?.['sign-in']}
      variant="default"
      size="lg"
      radius="md"
      aria-label="Sign-in"
    >
      <IconUser stroke={1} />
    </ActionIcon>
  );
};
