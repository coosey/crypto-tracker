import { FormattedNumber } from 'components/formatted-number';
import styles from './index.module.scss';
import { CarrotPriceChange } from 'components/carrot-price-change';
import { HoverCard, Text } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';

export interface FormattedDataRowProps {
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
}

const renderHoverCard = (
  hoverCard: boolean, 
  hoverCardName?: string, 
  hoverCardDescription?: string
) => {
  if (!hoverCard) return;
  return (
    <span className={styles?.['table-row_hover-card']}>
      <HoverCard width={360} shadow="md">
        <HoverCard.Target>
          <IconInfoCircle stroke={1.5} />
        </HoverCard.Target>
        <HoverCard.Dropdown>
          <Text size="md">{hoverCardName}</Text>
          {hoverCardDescription && (
            <Text size="md" mt="md">
              {hoverCardDescription}
            </Text>
          )}
        </HoverCard.Dropdown>
      </HoverCard>
    </span>
  );
};

const renderPriceRange = (low?: number, high?: number) => {
  if (!low || !high) return;
  return (
    <span className={styles?.['table-row_price']}>
      <FormattedNumber value={low} />
      {` - `}
      <FormattedNumber value={high} />
    </span>
  );
};

const renderPrice = (value, Component = null) => {
  if (value === undefined) {
    return null; // Or return a fallback UI
  }
  return (
    <span className={styles?.['table-row_price']}>
      {Component ? <Component value={value} /> : value}
    </span>
  )
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
        <span className={styles?.['table-row_name']}>{rowName}</span>
        {renderHoverCard(hoverCard, hoverCardName, hoverCardDescription)}
      </div>
      <div className={styles?.['table-row_price-percent']}>
        {rowValue && renderPrice(rowValue)}
        {rowPrice && renderPrice(rowPrice, FormattedNumber)}
        {priceChange && renderPrice(priceChange, CarrotPriceChange)}
        {renderPriceRange(priceDiff24Low, priceDiff24High)}
        {renderPriceRange(priceDiff7Low, priceDiff7High)}
      </div>
    </div>
  );
};
