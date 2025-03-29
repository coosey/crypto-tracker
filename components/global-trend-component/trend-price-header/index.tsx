import { CarrotPriceChange } from 'components/carrot-price-change';
import { compactNumbers } from 'libs/helpers/compactNumbers';
import styles from './index.module.scss';
import { Skeleton } from '@mantine/core';

interface Props {
  activeCoins: number;
  totalExchanges: number;
  totalMarketCap: number;
  marketCapChangePercentage: number;
  volume: number;
  loading: boolean;
}

const renderValue = (value: string | number, valueToDisplay: string | number) => {
  if (value) {
    return <>{valueToDisplay}</>;
  }
  return <>{' - '}</>;
};

export const TrendPriceHeader = ({
  activeCoins,
  totalExchanges,
  totalMarketCap,
  marketCapChangePercentage,
  volume,
  loading,
}: Props) => {
  const wrapper = styles?.['wrapper'];
  const priceTrendTitle = styles?.['priceTrend--title'];
  const priceTrendPrice = styles?.['priceTrend--price'];

  if (loading) {
    return <Skeleton height={20} width="50%" />;
  }

  return (
    <div className={styles?.['priceTrend']}>
      {/** Active Coins */}
      <div className={wrapper}>
        <span className={priceTrendTitle}>Coins:</span>
        <span className={priceTrendPrice}>
          {renderValue(activeCoins, activeCoins?.toLocaleString?.())}
        </span>
      </div>
      {/** # of Exchanges */}
      <div className={wrapper}>
        <span className={priceTrendTitle}>Exchanges:</span>
        <span className={priceTrendPrice}>
          {renderValue(totalExchanges, totalExchanges?.toLocaleString?.())}
        </span>
      </div>
      {/** Current Market Cap */}
      <div className={wrapper}>
        <span className={priceTrendTitle}>Market Cap:</span>
        <span className={priceTrendPrice}>
          {renderValue(totalMarketCap, compactNumbers(totalMarketCap))}
        </span>
        <div className={styles?.['priceTrend--priceChange']}>
          {marketCapChangePercentage && <CarrotPriceChange value={marketCapChangePercentage} />}
        </div>
      </div>
      {/** 24h Volume */}
      <div className={wrapper}>
        <span className={priceTrendTitle}>24h Volume:</span>
        <span className={priceTrendPrice}>{renderValue(volume, compactNumbers(volume))}</span>
      </div>
    </div>
  );
};
