import { FormattedNumber } from 'components/formatted-number';
import styles from './index.module.scss';
import { CarrotPriceChange } from 'components/carrot-price-change';
import { HoverCard, Text } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';

interface FormattedDataRowProps {
  rowName: string;
  rowPrice?: number;
  rowValue?: string | number | React.ReactNode;
  priceChange?: number;
  priceDiff24High?: number;
  priceDiff24Low?: number;
  priceDiff7High?: number;
  priceDiff7Low?: number;
  hoverCard?: boolean;
  hoverCardName?: string;
  hoverCardDescription?: string;
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
  hoverCard,
  hoverCardName,
  hoverCardDescription,
}: FormattedDataRowProps) => {
  return (
    <div key={rowName} className={styles?.['table-row']}>
      <div className={styles?.['table-row_name-icon']}>
        <span className={styles?.['table-row_name']}>
          {rowName}
        </span>
        {hoverCard && (
          <span className={styles?.['table-row_hover-card']}>
            <HoverCard width={360} shadow="md">
              <HoverCard.Target>
                <IconInfoCircle stroke={1.5} />
              </HoverCard.Target>
              <HoverCard.Dropdown>
                <Text size="md">{hoverCardName}</Text>
                {hoverCardDescription && <Text size="md" mt="md">{hoverCardDescription}</Text>}
              </HoverCard.Dropdown>
            </HoverCard>
          </span>
        )}
      </div>
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