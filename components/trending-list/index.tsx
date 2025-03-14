import { Flex } from '@mantine/core';
import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  TrendingCoinsResponse,
  TrendingListResponse,
} from 'libs/types/trending-list';
import { TrendingCard } from './trending-card';
import styles from './index.module.scss';

export const TrendingList = () => {
  const [trendingCoins, setTrendingCoins] = useState<TrendingCoinsResponse[]>(
    []
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    async function getTrendingList() {
      const response = await axios.get('/api/trending-list');
      // set trending coin list
      const retrievedTrendingCoins = getTopThreeTrendingCoins(response?.data);
      setTrendingCoins(retrievedTrendingCoins);
      // retrieve trending coin ids
      // const allTrendingCoins = response?.data?.[TrendingListType?.COINS];
      // const trendingCoinIds = getTrendingCoinIds(allTrendingCoins);
      // parse array of ids into a string
      // const stringIds = trendingCoinIds.join(',')
      // const trendingCoins = await axios.get('/api/current-rates', {params: { id: stringIds}})
      // console.log('trendingCoins',trendingCoins)
      setLoading(false);
    }
    getTrendingList();
  }, []);

  return (
    <Flex direction="row" className={styles?.['trendingList']}>
      <TrendingCard trendingCoins={trendingCoins} isLoading={loading} />
    </Flex>
  );
};

function getTopThreeTrendingCoins(data: TrendingListResponse) {
  return data?.coins?.slice?.(0, 3);
}

function getTrendingCoinIds(trendingCoins: TrendingCoinsResponse[]) {
  return trendingCoins.map((coin) => coin?.item.coin_id);
}
