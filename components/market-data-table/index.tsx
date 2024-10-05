
import '@mantine/core/styles/Table.css';
import styles from './index.module.scss';
import { Table } from '@mantine/core';

import { CoinsListResponse } from 'libs/types/coins-list';
import { IconCaretDownFilled, IconCaretUpFilled } from '@tabler/icons-react';
import { SortedTableHeader } from './sorted-table-header';

export interface MarketDataTableProps {
  data: CoinsListResponse[];
  headers: string[];
};

export const MarketDataTable = ({
  data,
  headers
}: MarketDataTableProps) => {
  const rows = data?.map?.((row) => {
    const oneHourPrice = row?.price_change_percentage_1h_in_currency;
    const oneDayPrice = row?.price_change_percentage_24h_in_currency;
    const sevenDayPrice = row?.price_change_percentage_7d_in_currency;
    return (
      <Table.Tr key={row?.name}>
        <Table.Td>{row?.market_cap_rank}</Table.Td>
        <Table.Td>
          <div className={styles?.['coin']}>
            <img alt={row?.symbol?.toUpperCase()} src={row?.image} loading='lazy' width={24} height={24} />
            <div className={styles?.['coin_name']}>
              <h4>{row?.name}</h4>
              <h3 className={styles?.['coin_symbol']}>{row?.symbol?.toUpperCase()}</h3>
            </div>
          </div>
        </Table.Td>
        <Table.Td className={styles?.['coin_price']} data-price-target='price'>
          ${row?.current_price?.toLocaleString()}
        </Table.Td>
        {/** 1H */}
        {DisplayPriceChange(oneHourPrice)}
        {/** 1D */}
        {DisplayPriceChange(oneDayPrice)}
        {/** 7D */}
        {DisplayPriceChange(sevenDayPrice)}
        <Table.Td data-price-target='price'>${row?.total_volume?.toLocaleString()}</Table.Td>
        <Table.Td data-price-target='price'>${row?.market_cap?.toLocaleString()}</Table.Td>
      </Table.Tr>
    );
  });

  return (
    <Table 
      verticalSpacing="lg"
      highlightOnHover>
      <Table.Thead>
        <Table.Tr>
          {headers?.map?.((header, idx) => (
            <Table.Th key={idx}>{header}</Table.Th>
            // <SortedTableHeader key={idx}>{header}</SortedTableHeader>
          ))}
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
};

/**
 * Helper to display current price (1H, 24H, 7D)
 * @param price number
 * @returns chart price at given intervals
 */
const DisplayPriceChange = (price: number) => {
  return price > 0 ? (
    <Table.Td className={styles?.['coin_price_green']} data-price-target='price'>
      <span className={styles?.['coin_price_change']}>
        <IconCaretUpFilled stroke={1} />
        {price ? `${price?.toFixed(2)}%` : '-'}
      </span>
    </Table.Td>
  ) : price < 0 ? (
    <Table.Td className={styles?.['coin_price_red']} data-price-target='price'>
      <span className={styles?.['coin_price_change']}>
        <IconCaretDownFilled stroke={1} />
        {price ? `${price?.toFixed(2)}%` : '-'}
      </span>
    </Table.Td>
  ) : (
    <Table.Td className={styles?.['coin_price']} data-price-target='price'>
      {price ? `${price?.toFixed(2)}%` : '-'}
    </Table.Td>
  )
}