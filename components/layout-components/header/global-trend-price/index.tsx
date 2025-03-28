import { CarrotPriceChange } from "components/carrot-price-change";
import { compactNumbers } from "libs/helpers/compactNumbers";
import styles from './index.module.scss';
import { useGlobalTrend } from "libs/context/global-trend";
import React from "react";

export const GlobalTrendPrice = () => {
  const {marketTrend} = useGlobalTrend();
  console.log('inside global market trend component', marketTrend);

  return (
    <div className={styles?.['trendPriceWrapper']}>
      <span className={styles?.["marketCap--title"]}>Market Cap:</span>
      <span className={styles?.["marketCap--price"]}>
        {marketTrend?.total_market_cap?.usd ? compactNumbers(marketTrend?.total_market_cap?.usd) : ' - '}
      </span>
      <div className={styles?.["marketCap--priceChange"]}>
        {marketTrend?.market_cap_change_percentage_24h_usd && (
          <CarrotPriceChange value={marketTrend?.market_cap_change_percentage_24h_usd} />
        )}
      </div>
    </div>
  )
}