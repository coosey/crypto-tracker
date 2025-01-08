import { PaginateComponent } from 'components/pagination';
import { CoinIdMarket } from '../market';
import styles from './index.module.scss';
import { TickersMarketObject } from 'libs/types/tickers';
import { Dispatch, SetStateAction } from 'react';
import { Select } from '@mantine/core';

interface Props {
  name: string;
  symbol: string;
  tickers: TickersMarketObject[];
  pageTotal: number;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
};

const ITEMS_PER_PAGE = ['10', '50', '100'];

export const TickersList = ({
  name,
  symbol,
  tickers,
  pageTotal,
  currentPage,
  setCurrentPage
}: Props) => {

  return (
    <div className={styles?.['ticker-market']} id="ticker-market">
      <CoinIdMarket
        name={name}
        symbol={symbol}
        tickers={tickers}
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
        {/** TODO: create logic to update state of select dropdown */}
        <Select
          className={styles?.['items-per-page']}
          data={ITEMS_PER_PAGE}
          defaultValue={ITEMS_PER_PAGE?.[0]}
          checkIconPosition="right"
          radius="md"
          comboboxProps={{ 
            width: 200, 
            position: 'bottom-start', 
            dropdownPadding: 10 
          }}
        />
      </div>
    </div>
  )
}