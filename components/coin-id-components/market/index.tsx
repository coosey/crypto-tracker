import { Anchor, Box, LoadingOverlay, Table } from "@mantine/core";
import { IconExternalLink } from '@tabler/icons-react';
import { FormattedNumber } from "components/formatted-number";
import styles from './index.module.scss';
import { TickersMarketObject } from "libs/types/tickers";

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

  const rows = tickers?.map?.((ticker, idx) => {
    return (
      <Table.Tr key={idx}>
        <Table.Td>
          <div className={styles?.['icon-symbol']}>
            <img 
              src={ticker?.market?.logo}
              width={24}
              height={24}
              alt={ticker?.market?.name}
            />
            <div>
              {ticker?.market?.name}
            </div>
          </div>
        </Table.Td>
        <Table.Td>
          <Anchor className={styles?.['trade-url']} href={ticker?.trade_url} target="_blank">
            {symbol?.toUpperCase?.() === ticker?.base ? 
              `${ticker?.base}/${ticker?.target}` :
              `${symbol?.toUpperCase?.()}/USDT`
            }
            <IconExternalLink strokeWidth={2} size={20} />
          </Anchor>
        </Table.Td>
        <Table.Td>
          <FormattedNumber value={ticker?.converted_last?.usd} />
        </Table.Td>
        <Table.Td>
          {ticker?.bid_ask_spread_percentage?.toFixed?.(2)}
        </Table.Td>
        <Table.Td>
          <FormattedNumber value={ticker?.converted_volume?.usd} />
        </Table.Td>
        <Table.Td className={styles?.['table-body']}>
          {ticker?.trust_score && (
            <div className={styles?.['trust-score']} style={{backgroundColor: `${ticker?.trust_score}`}}/>
          )}
          {!ticker?.trust_score && (
            ' - '
          )}
        </Table.Td>
      </Table.Tr>
    )
  })

  return (
    <div className={styles?.['coin-market']}>
      <h2>{name} Markets</h2>
      <Box pos="relative">
        <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
        <Table verticalSpacing="sm" highlightOnHover className={styles?.['table']}>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Exchange</Table.Th>
              <Table.Th>Pair</Table.Th>
              <Table.Th>Price</Table.Th>
              <Table.Th>Spread</Table.Th>
              <Table.Th>24H Volume</Table.Th>
              <Table.Th>Trust Score</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Box>
    </div>
  )
}