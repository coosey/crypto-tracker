import '@mantine/core/styles/Table.css';

import { MarketDataTableProps } from 'libs/types/market-data-table';
import { DataTableHeaders } from './headers';
import { DataTableRows } from './rows';
import { MarketDataTableHeaders } from '../market-data-table-headers';
import { useRouter } from 'next/router';
import { useSortTable } from 'libs/hooks/useSortTable';
import { DataTable } from '../data-table';
import { transformData } from 'libs/helpers/transformData';
import { useDisclosure } from '@mantine/hooks';
import { useCallback } from 'react';
import { LoginModal } from 'components/modals/login';

export const MarketDataTable = ({ data }: MarketDataTableProps) => {
  const router = useRouter();

  const handleRowClick = (coinId: string) => {
    router.push(`/coin/${coinId}`);
  };

  const coinsListTableData = transformData(data, (coin) => ({
    id: coin?.id || '',
    name: coin?.name || '',
    symbol: coin?.symbol || '',
    image: coin?.image || '',
    current_price: coin?.current_price || 0,
    price_change_percentage_1h_in_currency: coin?.price_change_percentage_1h_in_currency || 0,
    price_change_percentage_24h_in_currency: coin?.price_change_percentage_24h_in_currency || 0,
    price_change_percentage_7d_in_currency: coin?.price_change_percentage_7d_in_currency || 0,
    total_volume: coin?.total_volume || 0,
    market_cap: coin?.market_cap || 0,
    market_cap_rank: coin?.market_cap_rank || 0,
  }));

  const { sortField, sortDirection, handleSortChange, sortedData } =
    useSortTable(coinsListTableData);

  const [opened, { open, close }] = useDisclosure(false);

  const handleOpenInfoModal = useCallback(() => {
    open();
  }, []);

  return (
    <>
      <LoginModal opened={opened} onClose={close} withCloseButton />
      <DataTable verticalSpacing="md" highlightOnHover>
        {{
          header: (
            <MarketDataTableHeaders
              sortField={sortField}
              sortDirection={sortDirection}
              handleSortChange={handleSortChange}
              dataTableHeaders={DataTableHeaders}
            />
          ),
          body: (
            <DataTableRows
              rows={sortedData}
              handleRowClick={handleRowClick}
              openInfoModal={handleOpenInfoModal}
            />
          ),
        }}
      </DataTable>
    </>
  );
};
