import { Button, Modal } from '@mantine/core';
import styles from './index.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ModalComponent, ModalProps } from '..';

export const LoginModal = ({ opened, onClose, withCloseButton = true }: ModalProps) => {
  const router = useRouter();
  return (
    <ModalComponent
      className={styles?.['loginModal']}
      opened={opened}
      onClose={onClose}
      withCloseButton={withCloseButton}
    >
      {{
        modalBody: (
          <Modal.Body>
            <h2>Never Miss a Market Move</h2>
            <p>
              Create your free account to get real-time price updates and track your favorite
              cryptocurrencies.
            </p>
            <div className={styles?.['loginModal__buttons']}>
              <Button
                className={styles?.['sign-in-button']}
                onClick={() => router.push('/login?action=register')}
              >
                Sign Up
              </Button>
              <Link className={styles?.['loginModal__buttons--link']} href="login?action=login">
                Sign Into Existing Account
              </Link>
            </div>
          </Modal.Body>
        ),
      }}
    </ModalComponent>
  );
};
