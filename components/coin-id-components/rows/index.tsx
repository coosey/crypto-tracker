import { Table, Anchor } from "@mantine/core";
import { IconExternalLink } from "@tabler/icons-react";
import { FormattedNumber } from "components/formatted-number";
import { TickersMarketObject } from "libs/types/tickers";
import styles from './index.module.scss';

interface Props {
  tickers: TickersMarketObject[];
  symbol: string;
}

export const CoinIdTableRows = ({ tickers, symbol }: Props) => {
  return (
    <>
      {tickers?.map?.((ticker, idx) => {
        return (
          <Table.Tr key={idx}>
            <Table.Td>
              {ticker?.market_cap_rank}
            </Table.Td>
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
            <Table.Td data-price-target="price">
              <FormattedNumber value={ticker?.converted_last?.usd} />
            </Table.Td>
            <Table.Td>
              {ticker?.bid_ask_spread_percentage?.toFixed?.(2)}
            </Table.Td>
            <Table.Td data-price-target="price">
              <FormattedNumber value={ticker?.converted_volume?.usd} />
            </Table.Td>
            <Table.Td className={styles?.['table-body']}>
              {ticker?.trust_score && (
                <div className={styles?.['trust-score']} style={{ backgroundColor: `${ticker?.trust_score}` }} />
              )}
              {!ticker?.trust_score && (
                ' - '
              )}
            </Table.Td>
          </Table.Tr>
        )
      })}
    </>
  )
}