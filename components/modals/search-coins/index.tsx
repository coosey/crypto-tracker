import { Divider, Modal, TextInput } from '@mantine/core';
import { ModalComponent, ModalProps } from '..';
import { IconSearch } from '@tabler/icons-react';
import { useEffect, useMemo, useState } from 'react';
import { useDebounce } from 'libs/hooks/useDebounce';
import axios from 'axios';
import { isEmpty } from 'lodash';
import { SearchQuery } from 'libs/types/searched-coins';
import styles from './index.module.scss';
import { CoinItem } from './coin-item';
import useTrendingList from 'libs/hooks/useTrendingList';
import { useRouter } from 'next/router';

export const SearchCoinsModal = ({ opened, onClose, withCloseButton = true }: ModalProps) => {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState('');
  const [searchedCoins, setSearchedCoins] = useState({} as SearchQuery);

  const { trendingList } = useTrendingList();

  const trendingCoins = useMemo(
    () => trendingList?.coins?.map(({ item }) => ({ ...item })),
    [trendingList]
  );

  const debouncedSearch = useDebounce(searchInput);

  const handleSearch = (searchInput: string) => {
    setSearchInput(searchInput);
  };

  const handleClose = () => {
    setSearchInput('');
    onClose();
  };

  const handleCoinClick = (coinId: string) => {
    router.push(`/coin/${coinId}`);
  };

  useEffect(() => {
    if (!isEmpty(debouncedSearch)) {
      const fetchSearchQuery = async (searchQuery: string) => {
        try {
          const response = await axios.get('/api/search', {
            params: { query: searchQuery },
          });
          setSearchedCoins(response?.data);
        } catch (error) {
          console.error('Error fetching search results: ', error);
        }
      };
      fetchSearchQuery(debouncedSearch);
    } else {
      setSearchedCoins({} as SearchQuery);
    }
  }, [debouncedSearch]);

  return (
    <ModalComponent
      className={styles?.['modalContainer']}
      opened={opened}
      onClose={handleClose}
      withCloseButton={withCloseButton}
      size="xl"
    >
      {{
        modalBody: (
          <Modal.Body className={styles?.['modal']}>
            <h3>Search Coins</h3>
            <TextInput
              radius="md"
              size="md"
              placeholder="Bitcoin, etc."
              rightSectionWidth={42}
              value={searchInput}
              onChange={(e) => handleSearch(e?.target?.value)}
              leftSection={<IconSearch size={18} stroke={1.5} />}
            />
            <div className={styles?.['listWrapper']}>
              {isEmpty(debouncedSearch) && (
                <>
                  <Divider
                    className={styles?.['listWrapper_divider']}
                    my="xs"
                    label="Trending Coins"
                    labelPosition="left"
                  />
                  {trendingCoins?.map?.((coin) => (
                    <CoinItem
                      key={coin?.id}
                      id={coin?.id}
                      thumb={coin?.thumb}
                      name={coin?.name}
                      symbol={coin?.symbol}
                      handleClick={handleCoinClick}
                    />
                  ))}
                </>
              )}
              {searchedCoins?.coins?.map?.((coin) => (
                <CoinItem
                  key={coin?.id}
                  id={coin?.id}
                  thumb={coin?.thumb}
                  name={coin?.name}
                  symbol={coin?.symbol}
                  handleClick={handleCoinClick}
                />
              ))}
            </div>
          </Modal.Body>
        ),
      }}
    </ModalComponent>
  );
};
