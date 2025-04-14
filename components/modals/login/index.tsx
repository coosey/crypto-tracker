import { Button, Modal } from "@mantine/core";
import styles from "./index.module.scss";
import Link from "next/link";
import { Router, useRouter } from "next/router";

interface Props {
  opened: boolean;
  onClose: () => void;
  withCloseButton?: boolean;
}

export const LoginModal = ({
  opened,
  onClose,
  withCloseButton = true,
}: Props) => {
  const router = useRouter();
  return (
    <Modal
      className={styles?.['loginModal']}
      opened={opened}
      onClose={onClose}
      withCloseButton={withCloseButton}
      size="sm"
      centered
    >
      <Modal.Body>
        <h2>Never Miss a Market Move</h2>
        <p>
          Create your free account to get real-time price updates and 
          track your favorite cryptocurrencies.
        </p>
        <div className={styles?.['loginModal__buttons']}>
          <Button
            className={styles?.['sign-in-button']}
            onClick={() => router.push('/login?action=register')}>Sign Up</Button>
          <Link 
            className={styles?.['loginModal__buttons--link']} 
            href="login?action=login">
              Sign Into Existing Account
          </Link>
        </div>
      </Modal.Body>
    </Modal>
  );
}