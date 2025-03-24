import styles from './index.module.scss';
import { TrendingCard } from 'components/trending-list/card';
import useTrendingList from 'libs/hooks/useTrendingList';
import { TrendingCardItem } from 'components/trending-list/card-item';
import { formatNumberWithSubscriptZeros } from 'libs/helpers/formatNumbersWithSubscript';

export const TrendingCoins = () => {
  const { trendingList } = useTrendingList();
  return (
    <div className={styles?.['wrapper']}>
      {trendingList?.coins?.map?.((coin) => {
        const item = coin?.item;
        return (
          <TrendingCard key={coin.item.coin_id}>
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