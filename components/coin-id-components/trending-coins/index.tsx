import styles from './index.module.scss';
import { TrendingCard } from '@/components/trending-list/card';
import useTrendingList from 'libs/hooks/useTrendingList';
import { TrendingCardItem } from '@/components/trending-list/card-item';
import { formatNumberWithSubscriptZeros } from 'libs/helpers/formatNumbersWithSubscript';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

export const TrendingCoins = () => {
  const { trendingList } = useTrendingList();
  const router = useRouter();

  const handleClickTrendinCoin = useCallback((coinId: string) => {
    router.push(`/coin/${coinId}`);
  }, []);

  return (
    <div className={styles?.['wrapper']}>
      {trendingList?.coins?.map?.((coin) => {
        const item = coin?.item;
        const coinName = item?.id?.toLowerCase?.();
        return (
          <TrendingCard key={item?.coin_id} onClick={() => handleClickTrendinCoin(coinName)}>
            {{
              list: (
                <TrendingCardItem
                  className={styles?.['wrapper__item']}
                  imgSrc={item?.thumb}
                  imgAlt={item?.name} 
                  name={item?.name} 
                  marketPrice={formatNumberWithSubscriptZeros(item?.data?.price?.toString?.())} 
                  percentageChange={item?.data?.price_change_percentage_24h?.usd}
                />
              )
            }}
          </TrendingCard>
        )
      })}
    </div>
  )
};