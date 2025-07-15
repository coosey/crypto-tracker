import { ActionIcon, Menu } from '@mantine/core';
import { IconUser } from '@tabler/icons-react';
import styles from './index.module.scss';
import { memo } from 'react';

interface Props {
  handleLogout?: () => void;
  handleProfile?: () => void;
  userEmail?: string;
}

export const SignedInUser = memo(({ handleLogout, handleProfile, userEmail }: Props) => {
  return (
    <Menu width={200} shadow="md" transitionProps={{ transition: 'fade-down', duration: 150 }}>
      <Menu.Target>
        <ActionIcon
          className={styles?.['sign-in']}
          variant="default"
          size="lg"
          radius="md"
          aria-label="Sign-in"
        >
          <IconUser stroke={1} />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>{userEmail}</Menu.Label>
        <Menu.Divider />
        <Menu.Item onClick={handleProfile}>My Account</Menu.Item>
        <Menu.Item onClick={handleLogout}>Logout</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
});
