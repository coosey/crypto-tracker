import { Divider, LoadingOverlay, Modal, TextInput } from '@mantine/core';
import { ModalComponent, ModalProps } from '..';
import { IconSearch } from '@tabler/icons-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDebounce } from 'libs/hooks/useDebounce';
import { isEmpty } from 'lodash';
import { SearchQuery } from 'libs/types/searched-coins';
import styles from './index.module.scss';
import { CoinItem } from './coin-item';
import useTrendingList from 'libs/hooks/useTrendingList';
import { useRouter } from 'next/router';

export const SearchCoinsModal = ({ 
  opened, 
  onClose, 
  withCloseButton = true 
}: ModalProps) => {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState('');
  const [searchedCoins, setSearchedCoins] = useState({} as SearchQuery);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  const { trendingList } = useTrendingList();

  const trendingCoins = useMemo(
    () => trendingList?.coins?.map?.(({ item }) => ({ ...item })),
    [trendingList]
  );

  const debouncedSearch = useDebounce(searchInput);

  // Memoized coin lists
  const coinsToRender = useMemo(() => {
    const hasSearchQuery = !isEmpty(debouncedSearch);
    const hasSearchResults = !isEmpty(searchedCoins?.coins);
    
    if (hasSearchQuery) {
      return {
        type: 'search' as const,
        coins: searchedCoins?.coins || [],
        showEmpty: !isSearching && !hasSearchResults,
        showLoading: isSearching
      };
    }
    
    return {
      type: 'trending' as const,
      coins: trendingCoins || [],
      showEmpty: false,
      showLoading: false
    };
  }, [debouncedSearch, searchedCoins, trendingCoins, isSearching]);

  const handleSearch = (searchInput: string) => {
    setSearchInput(searchInput);
    setSearchError(null);
  };

  const handleClose = () => {
    setSearchInput('');
    setSearchedCoins({} as SearchQuery);
    setSearchError(null);
    onClose();
  };

  const handleCoinClick = useCallback((coinId: string) => {
    router.push(`/coin/${coinId}`);
  }, [router]);

  const handleFavoriteClick = useCallback((coinId: string) => {
    console.log('clicked coin id is: ', coinId)
  }, []);

  useEffect(() => {
    if (!isEmpty(debouncedSearch)) {
      const fetchSearchQuery = async (searchQuery: string) => {
        setIsSearching(true);
        setSearchError(null);
        try {
          const response = await (await fetch(
            `/api/search?query=${encodeURIComponent(searchQuery)}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            }
          )).json();
          setSearchedCoins(response);
        } catch (error) {
          console.error('Error fetching search results: ', error);
          setSearchError('Failed to search coins. Please try again.');
          setSearchedCoins({} as SearchQuery);
        } finally {
          setIsSearching(false);
        }
      };
      fetchSearchQuery(debouncedSearch);
    } else {
      setSearchedCoins({} as SearchQuery);
      setSearchError(null);
      setIsSearching(false);
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
              <LoadingOverlay 
                visible={coinsToRender.showLoading} 
                zIndex={1000} 
                overlayProps={{ 
                  radius: 'sm', 
                  blur: 1, 
                  pos: 'fixed',
                  top: 0,
                  left: 0,
                }} 
              />
              
              {/* Error State */}
              {searchError && (
                <div className={styles?.['errorMessage']}>
                  {searchError}
                </div>
              )}
              
              {/* Trending Coins Section */}
              {coinsToRender.type === 'trending' && (
                <>
                  <Divider
                    className={styles?.['listWrapper_divider']}
                    my="xs"
                    label="Trending Coins"
                    labelPosition="left"
                  />
                  {coinsToRender.coins.map((coin) => (
                    <CoinItem
                      key={coin?.id}
                      id={coin?.id}
                      thumb={coin?.thumb}
                      name={coin?.name}
                      symbol={coin?.symbol}
                      handleClick={handleCoinClick}
                      handleFavoriteClick={handleFavoriteClick}
                    />
                  ))}
                </>
              )}
              
              {/* Search Results Section */}
              {coinsToRender.type === 'search' && (
                <>
                  {coinsToRender.showEmpty && !searchError && (
                    <div className={styles?.['emptyMessage']}>
                      No coins found for "{debouncedSearch}"
                    </div>
                  )}
                  {coinsToRender.coins.map((coin) => (
                    <CoinItem
                      key={coin?.id}
                      id={coin?.id}
                      thumb={coin?.thumb}
                      name={coin?.name}
                      symbol={coin?.symbol}
                      handleClick={handleCoinClick}
                      handleFavoriteClick={handleFavoriteClick}
                    />
                  ))}
                </>
              )}
            </div>
          </Modal.Body>
        ),
      }}
    </ModalComponent>
  );
};
