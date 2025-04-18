import { Layout } from 'components/layout';
import styles from './styles/account.module.scss';
import { Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { SearchCoinsModal } from 'components/modals/search-coins';

export default function AccountPage() {
  const [opened, { open, close }] = useDisclosure(false);

  const handleOpenSearchModal = () => {
    open();
  };

  return (
    <Layout>
      <SearchCoinsModal opened={opened} onClose={close} withCloseButton />
      <div className={styles?.['account']}>
        <div>
          <h2>My Favorites</h2>
        </div>
        <div className={styles?.['imageContainer']}>
          <div>
            <img src="/images/owl.png" alt="owl" />
            <h4>Stay Ahead in Crypto with Smart Tracking</h4>
            <p>Never miss a major price movement. Your ultimate crypto research hub starts here!</p>
            <div className={styles?.['btnContainer']}>
              <Button onClick={handleOpenSearchModal}>Add Coin</Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
