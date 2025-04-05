import { ActionIcon, Menu } from "@mantine/core";
import { IconUser } from "@tabler/icons-react";
import styles from './index.module.scss';

interface Props {
  handleLogout?: () => void;
  handleProfile?: () => void;
}

export const SignedInUser = ({
  handleLogout,
  handleProfile,
}: Props) => {
  return (
    <Menu width={200} shadow="md">
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
        <Menu.Item onClick={handleProfile}>My Account</Menu.Item>
        <Menu.Item onClick={handleLogout}>Logout</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};