import styles from './index.module.scss';
import { TrendingCard } from 'components/trending-list/card';
import useTrendingList from 'libs/hooks/useTrendingList';
import { TrendingCardItem } from 'components/trending-list/card-item';
import { formatWithSubscriptZeros } from 'libs/helpers/formatNumbersWithSubscript';
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
        // formatting the price to scientific notation with 4 decimal places
        const numberSubscript = formatWithSubscriptZeros(item?.data?.price);
        return (
          <TrendingCard key={item?.coin_id} onClick={() => handleClickTrendinCoin(coinName)}>
            {{
              body: (
                <TrendingCardItem
                  className={styles?.['wrapper__item']}
                  imgSrc={item?.thumb}
                  imgAlt={item?.name}
                  name={item?.name}
                  marketPrice={numberSubscript}
                  percentageChange={item?.data?.price_change_percentage_24h?.usd}
                />
              ),
            }}
          </TrendingCard>
        );
      })}
    </div>
  );
};
