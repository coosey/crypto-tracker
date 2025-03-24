import { Table, Anchor } from '@mantine/core';
import { IconExternalLink } from '@tabler/icons-react';
import { FormattedNumber } from '@components/formatted-number';
import { TickersMarketObject } from '@libs/types/tickers';
import styles from './index.module.scss';

interface Props {
  tickers: TickersMarketObject[];
  symbol: string;
}

const EmptyRow = () => <>{' - '}</>;

const renderCoinIdRow = (value, Component = null) => {
  if (!value) return <EmptyRow />;
  else if (Component) return <Component value={value} />;
  else return value;
};

const renderTrustScore = (trustScore: string) => {
  if (!trustScore) return <EmptyRow />;
  return <div className={styles?.['trust-score']} style={{ backgroundColor: `${trustScore}` }} />;
};

const renderTradeUrl = (tradeUrl: string, symbol: string, ticker: TickersMarketObject) => {
  if (!tradeUrl) return <EmptyRow />;
  return (
    <Anchor className={styles?.['trade-url']} href={tradeUrl} target="_blank">
      {symbol?.toUpperCase?.() === ticker?.base
        ? `${ticker?.base}/${ticker?.target}`
        : `${symbol?.toUpperCase?.()}/USDT`}
      <IconExternalLink strokeWidth={2} size={20} />
    </Anchor>
  );
};

export const CoinIdTableRows = ({ tickers, symbol }: Props) => {
  return (
    <>
      {tickers?.map?.((ticker, idx) => {
        return (
          <Table.Tr key={idx}>
            <Table.Td>{ticker?.market_cap_rank}</Table.Td>
            <Table.Td>
              <div className={styles?.['icon-symbol']}>
                <img src={ticker?.market?.logo} width={24} height={24} alt={ticker?.market?.name} />
                <div>{ticker?.market?.name}</div>
              </div>
            </Table.Td>
            <Table.Td>{renderTradeUrl(ticker?.trade_url, symbol, ticker)}</Table.Td>
            <Table.Td data-price-target="price">
              {renderCoinIdRow(ticker?.converted_last?.usd, FormattedNumber)}
            </Table.Td>
            <Table.Td>{renderCoinIdRow(ticker?.bid_ask_spread_percentage?.toFixed?.(2))}</Table.Td>
            <Table.Td data-price-target="price">
              {renderCoinIdRow(ticker?.converted_volume?.usd, FormattedNumber)}
            </Table.Td>
            <Table.Td className={styles?.['table-body']}>
              {renderTrustScore(ticker?.trust_score)}
            </Table.Td>
          </Table.Tr>
        );
      })}
    </>
  );
};
