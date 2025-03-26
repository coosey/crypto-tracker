import { PaginateComponent } from 'components/pagination';
import { CoinIdMarket } from './market';
import styles from './index.module.scss';
import { useState } from 'react';
import { Select } from '@mantine/core';
import { useGetTickerData } from 'lib/hooks/useGetTickersData';
import { handleScrollToDiv } from 'lib/helpers/handleScrollToDiv';

interface Props {
  name: string;
  symbol: string;
  coinId: string;
}

const ITEMS_PER_PAGE = ['10', '50', '100'];

export const TickersList = ({ name, symbol, coinId }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowItems, setRowItems] = useState(ITEMS_PER_PAGE?.[0]);

  // retrieve ticker data by coin id
  const { tickersData, pageTotal, loading } = useGetTickerData(
    currentPage,
    coinId,
    Number(rowItems)
  );

  return (
    <div className={styles?.['ticker-market']} id="ticker-market">
      <CoinIdMarket
        name={name}
        symbol={symbol}
        tickers={tickersData?.tickersBySize}
        loading={loading}
      />
      <div className={styles?.['ticker-market_footer']}>
        <PaginateComponent
          className={styles?.['paginate']}
          pageTotal={pageTotal}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          scrollToDiv
          scrollId="ticker-market"
          block="header-top"
        />
        <label>Rows</label>
        <Select
          className={styles?.['items-per-page']}
          data={ITEMS_PER_PAGE}
          onChange={(val) => {
            setRowItems(val);
            handleScrollToDiv('ticker-market', 'header-top');
          }}
          value={rowItems}
          checkIconPosition="right"
          radius="md"
          comboboxProps={{
            width: 200,
            position: 'bottom-start',
            dropdownPadding: 10,
          }}
        />
      </div>
    </div>
  );
};
