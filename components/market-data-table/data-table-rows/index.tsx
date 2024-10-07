import { Table } from "@mantine/core";
import { IconCaretUpFilled, IconCaretDownFilled } from "@tabler/icons-react";
import { CoinsListResponse } from "libs/types/coins-list";
import styles from './index.module.scss';

interface DataTableRowsProps {
  rows: CoinsListResponse[];
}

export const DataTableRows = ({ rows }: DataTableRowsProps) => {
  return (
    <>
      {rows?.map?.((row) => {
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
            {DisplayPriceChange(row?.price_change_percentage_1h_in_currency)}
            {/** 1D */}
            {DisplayPriceChange(row?.price_change_percentage_24h_in_currency)}
            {/** 7D */}
            {DisplayPriceChange(row?.price_change_percentage_7d_in_currency)}
            <Table.Td data-price-target='price'>${row?.total_volume?.toLocaleString()}</Table.Td>
            <Table.Td data-price-target='price'>${row?.market_cap?.toLocaleString()}</Table.Td>
          </Table.Tr>
        )
      })}
    </>
  )
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