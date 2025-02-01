import { Box, LoadingOverlay, Table } from "@mantine/core";
import styles from './index.module.scss';
import { TickersMarketObject } from "libs/types/tickers";
import { CoinIdTableHeaders } from "../headers";
import { MarketDataTableHeaders } from "components/market-data-table-headers";
import { CoinIdTableRows } from "../rows";
import { useSortIdTable } from "libs/hooks/useSortIdTable";

interface Props {
  name: string;
  tickers: TickersMarketObject[];
  symbol: string;
  loading?: boolean;
}

export const CoinIdMarket = ({
  name,
  tickers,
  symbol,
  loading
}: Props) => { 
  const {
    sortField,
    sortDirection,
    handleSortChange,
    sortedData
  } = useSortIdTable(tickers);

  return (
    <div className={styles?.['coin-market']}>
      <h2>{name} Markets</h2>
      <Box pos="relative">
        <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
        <Table verticalSpacing="sm" highlightOnHover className={styles?.['table']}>
          <Table.Thead>
            <Table.Tr>
              <MarketDataTableHeaders
                sortField={sortField}
                sortDirection={sortDirection}
                handleSortChange={handleSortChange}
                dataTableHeaders={CoinIdTableHeaders}
              />
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            <CoinIdTableRows tickers={sortedData} symbol={symbol} />
          </Table.Tbody>
        </Table>
      </Box>
    </div>
  )
}
