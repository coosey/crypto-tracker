import { FormattedNumber } from 'components/formatted-number';
import styles from './index.module.scss';
import { CarrotPriceChange } from 'components/carrot-price-change';

interface FormattedDataRowProps {
  rowName: string;
  rowPrice?: number;
  rowValue?: string | number | React.ReactNode;
  priceChange?: number;
  priceDiff24High?: number;
  priceDiff24Low?: number;
  priceDiff7High?: number;
  priceDiff7Low?: number;
};

export const FormattedDataRow = ({
  rowName, 
  rowPrice,
  rowValue,
  priceChange,
  priceDiff24High,
  priceDiff24Low,
  priceDiff7High,
  priceDiff7Low,
}: FormattedDataRowProps) => {
  return (
    <div key={rowName} className={styles?.['table-row']}>
      <span className={styles?.['table-row_name']}>{rowName}</span>
      <div className={styles?.['table-row_price-percent']}>
        {rowValue && (
          <span className={styles?.['table-row_price']}>
            {rowValue}
          </span>  
        )}
        {rowPrice && (
          <span className={styles?.['table-row_price']}>
            <FormattedNumber value={rowPrice} />
          </span>  
        )}
        {priceChange && (
          <span className={styles?.['table-row_price']}>
            <CarrotPriceChange price={priceChange} />
          </span>
        )}
        {priceDiff24High && priceDiff24Low && (
          <span className={styles?.['table-row_price']}>
            <FormattedNumber value={priceDiff24Low} />
            {` - `}
            <FormattedNumber value={priceDiff24High} />
          </span>
        )}
        {priceDiff7High && priceDiff7Low && (
          <span className={styles?.['table-row_price']}>
            <FormattedNumber value={priceDiff7Low} />
            {` - `}
            <FormattedNumber value={priceDiff7High} />
          </span>
        )}
      </div>
    </div>
  );
};