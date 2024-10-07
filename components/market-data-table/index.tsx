import '@mantine/core/styles/Table.css';
import styles from './index.module.scss';

import { useState } from 'react';
import { Table } from '@mantine/core';
import { TableHeader } from './table-header';
import {
  MarketDataTableProps,
  SortDirection,
  SortField,
  SortFieldEnum,
} from 'libs/types/market-data-table';
import { DataTableHeaders } from './data-table-headers';
import { MarketCapHoverCard } from './market-cap-hovercard';
import { CoinsListResponse } from 'libs/types/coins-list';
import { DataTableRows } from './data-table-rows';

export const MarketDataTable = ({ data }: MarketDataTableProps) => {
  const [sortDirection, setSortDirection] = useState<SortDirection | null>(
    'ASC'
  );
  const [sortField, setSortField] = useState<SortField | null>(
    'market_cap_rank'
  );

  const sortedData = handleSortData(data, sortField, sortDirection);

  const handleSortChange = (sortType: SortField) => {
    if (sortField !== sortType) {
      setSortField(sortType);
      setSortDirection('ASC');
    } else {
      setSortField(sortType);
      setSortDirection(sortDirection === 'ASC' ? 'DESC' : 'ASC');
    }
    handleSortData(data, sortField, sortDirection);
  };

  return (
    <Table verticalSpacing="lg" highlightOnHover>
      <Table.Thead>
        <Table.Tr>
          {DataTableHeaders?.map?.((header) => {
            if (header.fieldEnum === SortFieldEnum.MARKET_CAP) {
              return (
                <TableHeader
                  key={header?.fieldEnum}
                  headerText={header?.fieldHeaderText}
                  sorted={sortField === header?.fieldEnum}
                  sortType={sortDirection}
                  sortField={header?.sortField}
                  onSort={() => handleSortChange(header?.fieldEnum)}
                >
                  <MarketCapHoverCard
                    infoStyle={styles?.['table_info-group']}
                    groupStyle={styles?.['table_info-icon']}
                  />
                </TableHeader>
              );
            }
            return (
              <TableHeader
                key={header?.fieldEnum}
                headerText={header?.fieldHeaderText}
                sorted={sortField === header?.fieldEnum}
                sortType={sortDirection}
                sortField={header?.sortField}
                onSort={() => handleSortChange(header?.sortField)}
              />
            );
          })}
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        <DataTableRows rows={sortedData} />
      </Table.Tbody>
    </Table>
  );
};

const handleSortData = (
  dataList: CoinsListResponse[],
  field: SortField,
  direction: SortDirection
) => {
  const dataClone = dataList?.slice?.();
  switch (field) {
    case 'market_cap_rank': {
      return dataClone?.sort?.((a, b) =>
        direction === 'ASC' ? a?.[field] - b?.[field] : b?.[field] - a?.[field]
      );
    }
    case 'current_price':
    case 'price_change_percentage_1h_in_currency':
    case 'price_change_percentage_24h_in_currency':
    case 'price_change_percentage_7d_in_currency':
    case 'total_volume':
    case 'market_cap': {
      return dataClone?.sort?.((a, b) =>
        direction === 'ASC' ? b?.[field] - a?.[field] : a?.[field] - b?.[field]
      );
    }
    case 'name': {
      return dataClone?.sort?.((a, b) =>
        direction === 'ASC'
          ? a?.[field].localeCompare(b?.[field])
          : b?.[field].localeCompare(a?.[field])
      );
    }
  }
};
