import { Table } from '@mantine/core';
import { CoinsListResponse } from '@libs/types/coins-list';
import styles from './index.module.scss';
import { FavoriteButton } from '../../favorite-button';
import { CarrotPriceChange } from '../../carrot-price-change';
import { formatNumberWithSubscriptZeros } from '@libs/helpers/formatNumbersWithSubscript';
import { DataTableSkeleton } from '../skeleton';
import { FormattedNumber } from '@components/formatted-number';
import { memo } from 'react';

interface Props {
  rows: CoinsListResponse[];
  handleRowClick?: (coinId: string) => void;
}

export const DataTableRows = memo(function DataTableRows({ rows, handleRowClick }: Props) {
  return (
    <>
      {/** Skeleton */}
      {!rows?.length &&
        Array(50)
          .fill(null)
          .map((_, idx) => <DataTableSkeleton key={idx} />)}
      {/** Data Table rows */}
      {rows?.map?.((row) => {
        const numberedCoinPrice = Number(
          formatNumberWithSubscriptZeros(row?.current_price?.toString?.())
        );
        const formattedSubscript = formatNumberWithSubscriptZeros(row?.current_price?.toString?.());
        return (
          <Table.Tr key={row?.name}>
            <Table.Td>
              <FavoriteButton />
            </Table.Td>
            <Table.Td>{row?.market_cap_rank}</Table.Td>
            <Table.Td className={styles?.['table']}>
              <div
                className={styles?.['coin']}
                onClick={() => handleRowClick && handleRowClick?.(row?.id)}
              >
                <img
                  alt={row?.symbol?.toUpperCase()}
                  src={row?.image}
                  loading="lazy"
                  width={24}
                  height={24}
                />
                <div className={styles?.['coin_name']}>
                  <h4>{row?.name}</h4>
                  <h3 className={styles?.['coin_symbol']}>{row?.symbol?.toUpperCase()}</h3>
                </div>
              </div>
            </Table.Td>
            <Table.Td className={styles?.['coin_price']} data-price-target="price">
              {row?.current_price > 1 ? (
                <FormattedNumber value={numberedCoinPrice} />
              ) : (
                `$${formattedSubscript}`
              )}
            </Table.Td>
            {/** 1H */}
            <Table.Td>
              <CarrotPriceChange price={row?.price_change_percentage_1h_in_currency} />
            </Table.Td>
            {/** 1D */}
            <Table.Td>
              <CarrotPriceChange price={row?.price_change_percentage_24h_in_currency} />
            </Table.Td>
            {/** 7D */}
            <Table.Td>
              <CarrotPriceChange price={row?.price_change_percentage_7d_in_currency} />
            </Table.Td>
            <Table.Td data-price-target="price">
              <FormattedNumber value={row?.total_volume} />
            </Table.Td>
            <Table.Td data-price-target="price">
              <FormattedNumber value={row?.market_cap} />
            </Table.Td>
          </Table.Tr>
        );
      })}
    </>
  );
});
