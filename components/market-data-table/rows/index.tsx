import { Table } from '@mantine/core';
import { CoinsListResponse } from 'libs/types/coins-list';
import styles from './index.module.scss';
import { FavoriteButton } from 'components/buttons/favorite';
import { CarrotPriceChange } from '../../carrot-price-change';
import { formatWithSubscriptZeros } from 'libs/helpers/formatNumbersWithSubscript';
import { DataTableSkeleton } from '../skeleton';
import { FormattedNumber } from 'components/formatted-number';
import { memo, useState } from 'react';
import { useUserStore } from 'stores';

interface Props {
  rows: CoinsListResponse[];
  handleRowClick?: (coinId: string) => void;
  favoriteSelected?: boolean;
  openInfoModal?: () => void;
}

export const DataTableRows = memo(function DataTableRows({
  rows,
  handleRowClick,
  openInfoModal,
}: Props) {
  const [favoriteSelected, setFavoriteSelected] = useState(false);
  const { isAuthenticated } = useUserStore();

  const handleFavoriteClick = (coinId: string) => {
    if (!isAuthenticated) {
      openInfoModal && openInfoModal?.();
      return;
    }
  };

  return (
    <>
      {/** Skeleton */}
      {!rows?.length &&
        Array(50)
          .fill(null)
          .map((_, idx) => <DataTableSkeleton key={idx} />)}
      {/** Data Table rows */}
      {rows?.map?.((row) => {
        const currentPrice = row?.current_price || 0;
        const formattedSubscript = formatWithSubscriptZeros(currentPrice);
        return (
          <Table.Tr key={row?.name}>
            <Table.Td>
              <FavoriteButton
                handleFavoriteClick={() => handleFavoriteClick && handleFavoriteClick?.(row?.id)}
                selected={favoriteSelected}
              />
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
              {formattedSubscript}
            </Table.Td>
            {/** 1H */}
            <Table.Td>
              <CarrotPriceChange value={row?.price_change_percentage_1h_in_currency} />
            </Table.Td>
            {/** 1D */}
            <Table.Td>
              <CarrotPriceChange value={row?.price_change_percentage_24h_in_currency} />
            </Table.Td>
            {/** 7D */}
            <Table.Td>
              <CarrotPriceChange value={row?.price_change_percentage_7d_in_currency} />
            </Table.Td>
            {/** Volume */}
            <Table.Td data-price-target="price">
              <FormattedNumber value={row?.total_volume} />
            </Table.Td>
            {/** Market Cap */}
            <Table.Td data-price-target="price">
              <FormattedNumber value={row?.market_cap} />
            </Table.Td>
          </Table.Tr>
        );
      })}
    </>
  );
});
