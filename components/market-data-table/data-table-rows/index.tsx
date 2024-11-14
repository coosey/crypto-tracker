import { Table } from '@mantine/core';
import { CoinsListResponse } from 'libs/types/coins-list';
import styles from './index.module.scss';
import { FavoriteButton } from '../favorite-button';
import { CarrotPriceChange } from '../carrot-price-change';

interface Props {
  rows: CoinsListResponse[];
}

export const DataTableRows = ({ rows }: Props) => {
  return (
    <>
      {rows?.map?.((row) => {
        return (
          <Table.Tr key={row?.name}>
            <Table.Td>
              <FavoriteButton />
            </Table.Td>
            <Table.Td>{row?.market_cap_rank}</Table.Td>
            <Table.Td>
              <div className={styles?.['coin']}>
                <img
                  alt={row?.symbol?.toUpperCase()}
                  src={row?.image}
                  loading="lazy"
                  width={24}
                  height={24}
                />
                <div className={styles?.['coin_name']}>
                  <h4>{row?.name}</h4>
                  <h3 className={styles?.['coin_symbol']}>
                    {row?.symbol?.toUpperCase()}
                  </h3>
                </div>
              </div>
            </Table.Td>
            <Table.Td
              className={styles?.['coin_price']}
              data-price-target="price"
            >
              ${row?.current_price?.toLocaleString()}
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
              ${row?.total_volume?.toLocaleString()}
            </Table.Td>
            <Table.Td data-price-target="price">
              ${row?.market_cap?.toLocaleString()}
            </Table.Td>
          </Table.Tr>
        );
      })}
    </>
  );
};