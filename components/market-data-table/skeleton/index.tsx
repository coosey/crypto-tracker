import { Table, Skeleton } from '@mantine/core';
import { FavoriteButton } from 'components/buttons/favorite';
import styles from './index.module.scss';

export const DataTableSkeleton = () => {
  return (
    <Table.Tr>
      <Table.Td>
        <FavoriteButton />
      </Table.Td>
      <Table.Td>
        <Skeleton height={20} width="50%" />
      </Table.Td>
      <Table.Td>
        <div className={styles?.['loading']}>
          <Skeleton height={29} width={29} circle />
          <Skeleton height={20} width="30%" />
        </div>
      </Table.Td>
      <Table.Td className={styles?.['coin_price']} data-price-target="price">
        <Skeleton height={20} />
      </Table.Td>
      {/** 1H */}
      <Table.Td>
        <Skeleton height={20} />
      </Table.Td>
      {/** 1D */}
      <Table.Td>
        <Skeleton height={20} />
      </Table.Td>
      {/** 7D */}
      <Table.Td>
        <Skeleton height={20} />
      </Table.Td>
      <Table.Td data-price-target="price">
        <Skeleton height={20} />
      </Table.Td>
      <Table.Td data-price-target="price">
        <Skeleton height={20} />
      </Table.Td>
    </Table.Tr>
  );
};
