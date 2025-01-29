import '@mantine/core/styles/Table.css';
import { Table } from '@mantine/core';
import { MarketDataTableProps } from 'libs/types/market-data-table';
import { DataTableHeaders } from './headers';
import { DataTableRows } from './rows';
import { MarketDataTableHeaders } from '../market-data-table-headers';
import { useRouter } from 'next/router';
import { useSortTable } from 'libs/hooks/useSortTable';

export const MarketDataTable = ({ data }: MarketDataTableProps) => {
  const router = useRouter();

  const handleRowClick = (coinId: string) => {
    router.push(`/coin/${coinId}`);
  };

  const { sortField, sortDirection, handleSortChange, sortedData } =
    useSortTable(data);

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
        <DataTableRows rows={sortedData} handleRowClick={handleRowClick} />
      </Table.Tbody>
    </Table>
  );
};
