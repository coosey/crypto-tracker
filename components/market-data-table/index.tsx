import '@mantine/core/styles/Table.css';
import { MarketDataTableProps, TableData } from 'libs/types/market-data-table';
import { DataTableHeaders } from './headers';
import { DataTableRows } from './rows';
import { MarketDataTableHeaders } from '../market-data-table-headers';
import { useRouter } from 'next/router';
import { useSortTable } from 'libs/hooks/useSortTable';
import { DataTable } from '../data-table';
import { CoinsListResponse } from 'libs/types/coins-list';

export const MarketDataTable = ({ data }: MarketDataTableProps) => {
  const router = useRouter();

  const handleRowClick = (coinId: string) => {
    router.push(`/coin/${coinId}`);
  };

  const tableData = transformCoinsListResponse(data);

  const { sortField, sortDirection, handleSortChange, sortedData } = useSortTable(tableData);

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

function transformCoinsListResponse(responseList: CoinsListResponse[]): TableData[] {
  return responseList?.map?.((coin) => ({
    id: coin?.id,
    name: coin?.name,
    symbol: coin?.symbol,
    image: coin?.image,
    current_price: coin?.current_price,
    price_change_percentage_1h_in_currency: coin?.price_change_percentage_1h_in_currency,
    price_change_percentage_24h_in_currency: coin?.price_change_percentage_24h_in_currency,
    price_change_percentage_7d_in_currency: coin?.price_change_percentage_7d_in_currency,
    total_volume: coin?.total_volume,
    market_cap: coin?.market_cap,
    market_cap_rank: coin?.market_cap_rank,
  }));
};