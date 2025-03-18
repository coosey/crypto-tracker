import { IconCaretUpFilled, IconCaretDownFilled } from '@tabler/icons-react';
import cn from 'classnames';
import styles from './index.module.scss';

interface Props {
  price: number | null;
  className?: string;
  decimalPlaces?: number;
  showEmptyState?: string;
}

export const CarrotPriceChange = ({
  price,
  className,
  decimalPlaces = 2,
  showEmptyState = '-',
}: Props) => {
  const getPriceDisplay = (value: number) => {
    return `${value?.toFixed?.(decimalPlaces)}%`;
  };

  const renderPriceContent = () => {
    if (price === null) {
      return (
        <div className={cn(styles?.['price'], className)} data-price-target="price" data-testid="carrot-price">
          {showEmptyState}
        </div>
      );
    }
    const isPositive = price > 0;
    const priceClassName = isPositive ? styles?.price_green : styles?.price_red;
    const CaretIcon = isPositive ? IconCaretUpFilled : IconCaretDownFilled;

    return (
      <div className={cn(priceClassName, className)} data-price-target="price" data-testid="carrot-price">
        <span className={styles?.['price_change']}>
          <CaretIcon stroke={1} data-testid="carrot-icon" />
          {getPriceDisplay(price)}
        </span>
      </div>
    );
  };

  return <>{renderPriceContent()}</>;
};
