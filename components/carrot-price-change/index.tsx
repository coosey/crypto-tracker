import { IconCaretUpFilled, IconCaretDownFilled } from '@tabler/icons-react';
import cn from 'classnames';
import styles from './index.module.scss';

interface Props {
  value: number | null;
  className?: string;
  decimalPlaces?: number;
  showEmptyState?: string;
}

export const CarrotPriceChange = ({
  value,
  className,
  decimalPlaces = 2,
  showEmptyState = '-',
}: Props) => {
  const getPriceDisplay = (price: number) => {
    return `${price?.toFixed?.(decimalPlaces)}%`;
  };

  const renderPriceContent = () => {
    if (value === null) {
      return (
        <div className={cn(styles?.['price'], className)} data-price-target="price" data-testid="carrot-price">
          {showEmptyState}
        </div>
      );
    }
    const isPositive = value > 0;
    const priceClassName = isPositive ? styles?.price_green : styles?.price_red;
    const CaretIcon = isPositive ? IconCaretUpFilled : IconCaretDownFilled;

    return (
      <div className={cn(priceClassName, className)} data-price-target="price" data-testid="carrot-price">
        <span className={styles?.['price_change']}>
          <CaretIcon stroke={1} data-testid="carrot-icon" />
          {getPriceDisplay(value)}
        </span>
      </div>
    );
  };

  return <>{renderPriceContent()}</>;
};
