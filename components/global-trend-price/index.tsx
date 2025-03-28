import { TrendingCard } from "components/trending-list/card";
import { GlobalMarketTrend } from 'libs/types/trending-list';
import { FormattedNumber } from 'components/formatted-number';
import styles from './index.module.scss';
import { CarrotPriceChange } from "components/carrot-price-change";
import { Skeleton } from "@mantine/core";

interface GlobalTrendProps {
  globalTrend: GlobalMarketTrend;
}

const renderMarketTrend = (
  price: number,
  carrotPrice: number,
  priceTitle: string
) => {
  return (
    <div className={styles?.['priceSectionWrapper']}>
      <div>
        <span className={styles?.['priceSectionWrapper__price']}>
          {price ? (
            <FormattedNumber value={price} />) : (
            <Skeleton height={20} width={200} />
          )}
        </span>
      </div>
      <div className={styles?.['priceSectionWrapper__trend']}>
        <p>{priceTitle}</p>
        {carrotPrice ? (
          <CarrotPriceChange value={carrotPrice} />) : (
          <Skeleton height={20} width={75} />
        )}
      </div>
    </div>
  )
}

export const GlobalTrendPrice = ({ globalTrend }: GlobalTrendProps) => {

  return (
    <div className={styles?.['globalTrendPrice']}>
      <TrendingCard>
        {{
          body: (renderMarketTrend(
            globalTrend?.market_cap_usd,
            globalTrend?.market_cap_change_24h,
            'Market Cap'
          ))
        }}
      </TrendingCard>
      <TrendingCard>
        {{
          body: (renderMarketTrend(
            globalTrend?.volume_24h_usd,
            globalTrend?.volume_24h_change_24h,
            '24h Volume'
          ))
        }}
      </TrendingCard>
    </div>
  )
};