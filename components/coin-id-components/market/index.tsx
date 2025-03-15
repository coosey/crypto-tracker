import { Box, LoadingOverlay } from "@mantine/core";
import { TickersMarketObject } from "libs/types/tickers";
import { CoinIdTableHeaders } from "../headers";
import { MarketDataTableHeaders } from "components/market-data-table-headers";
import { CoinIdTableRows } from "../rows";
import { useSortIdTable } from "libs/hooks/useSortIdTable";
import { DataTable } from "components/data-table";
import styles from './index.module.scss';

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
        <DataTable
          children={
            <MarketDataTableHeaders
              sortField={sortField}
              sortDirection={sortDirection}
              handleSortChange={handleSortChange}
              dataTableHeaders={CoinIdTableHeaders}
            />
          }
          dataTableChildren={
            <CoinIdTableRows tickers={sortedData} symbol={symbol} />
          }
        />
      </Box>
    </div>
  )
}
