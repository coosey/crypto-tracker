import { TrendingCard } from 'components/trending-list/card';
import { FormattedNumber } from 'components/formatted-number';
import styles from './index.module.scss';
import { CarrotPriceChange } from 'components/carrot-price-change';
import { Skeleton } from '@mantine/core';
import { useGlobalTrend } from 'libs/context/global-trend';

const renderMarketTrend = (price: number, carrotPrice: number | null, priceTitle: string) => {
  return (
    <div className={styles?.['priceSectionWrapper']}>
      <div>
        <span className={styles?.['priceSectionWrapper__price']}>
          {price ? <FormattedNumber value={price} /> : <Skeleton height={20} width={200} />}
        </span>
      </div>
      <div className={styles?.['priceSectionWrapper__trend']}>
        <p>{priceTitle}</p>
        {carrotPrice ? (
          <CarrotPriceChange value={carrotPrice} />
        ) : carrotPrice === null ? (
          <></>
        ) : (
          <Skeleton height={20} width={75} />
        )}
      </div>
    </div>
  );
};

export const GlobalTrendPrice = () => {
  const { marketTrend } = useGlobalTrend();
  return (
    <div className={styles?.['globalTrendPrice']} data-testid="global-trend-price">
      <TrendingCard>
        {{
          body: renderMarketTrend(
            marketTrend?.total_market_cap?.usd,
            marketTrend?.market_cap_change_percentage_24h_usd,
            'Market Cap'
          ),
        }}
      </TrendingCard>
      <TrendingCard>
        {{
          body: renderMarketTrend(marketTrend?.total_volume?.usd, null, '24h Volume'),
        }}
      </TrendingCard>
    </div>
  );
};
