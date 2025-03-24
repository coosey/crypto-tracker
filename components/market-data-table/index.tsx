import '@mantine/core/styles/Table.css';
import { MarketDataTableProps } from '@libs/types/market-data-table';
import { DataTableHeaders } from './headers';
import { DataTableRows } from './rows';
import { MarketDataTableHeaders } from '../market-data-table-headers';
import { useRouter } from 'next/router';
import { useSortTable } from '@libs/hooks/useSortTable';
import { DataTable } from '@components/data-table';

export const MarketDataTable = ({ data }: MarketDataTableProps) => {
  const router = useRouter();

  const handleRowClick = (coinId: string) => {
    router.push(`/coin/${coinId}`);
  };

  const { sortField, sortDirection, handleSortChange, sortedData } = useSortTable(data);

  return (
    <>
      <DataTable>
        {{
          header: (
            <MarketDataTableHeaders
              sortField={sortField}
              sortDirection={sortDirection}
              handleSortChange={handleSortChange}
              dataTableHeaders={DataTableHeaders}
            />
          ),
          body: <DataTableRows rows={sortedData} handleRowClick={handleRowClick} />,
        }}
      </DataTable>
    </>
  );
};
