import { TrendPriceHeader } from "./trend-price-header";
import { useGlobalTrend } from "libs/context/global-trend";
import styles from './index.module.scss';

export const GlobalTrendHeader = () => {
  const { marketTrend, marketTrendLoading } = useGlobalTrend();

  return (
    <div className={styles?.["container"]}>
      <TrendPriceHeader
        activeCoins={marketTrend?.active_cryptocurrencies}
        totalExchanges={marketTrend?.markets}
        totalMarketCap={marketTrend?.total_market_cap?.usd}
        marketCapChangePercentage={marketTrend?.market_cap_change_percentage_24h_usd}
        volume={marketTrend?.total_volume?.usd}
        loading={marketTrendLoading}
      />
    </div>
  )
};