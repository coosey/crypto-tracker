import '@mantine/core/styles/Table.css';

import { useState } from 'react';
import { Table } from '@mantine/core';
import {
  MarketDataTableProps,
  SortDirection,
  SortField,
} from 'libs/types/market-data-table';
import { DataTableHeaders } from './headers';
import { CoinsListResponse } from 'libs/types/coins-list';
import { DataTableRows } from './rows';
import { MarketDataTableHeaders } from '../market-data-table-headers';
import { useRouter } from 'next/router';

export const MarketDataTable = ({ 
  data,
}: MarketDataTableProps) => {
  const router = useRouter();
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

  const handleRowClick = (coinId: string) => {
    router.push(`/coin/${coinId}`)
  };

  return (
    <Table verticalSpacing="lg" highlightOnHover>
      <Table.Thead>
        <Table.Tr>
         <MarketDataTableHeaders
            sortField={sortField} 
            sortDirection={sortDirection}
            handleSortChange={handleSortChange}
            dataTableHeaders={DataTableHeaders}
          />
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        <DataTableRows rows={sortedData} handleRowClick={handleRowClick}/>
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
