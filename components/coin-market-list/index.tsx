import styles from './index.module.scss';
import { MarketDataTable } from 'components/market-data-table';
import { useState } from 'react';
import { useGetMarketData } from 'libs/hooks/useGetMarketData';
import { PaginateComponent } from 'components/pagination';

export const CoinMarketList = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const {coinsList, pageTotal} = useGetMarketData(currentPage);

  return (
    <>
      <div className={styles?.['title']}>
        <h1 id="current-prices">Today's Cryptocurrency Prices</h1>
      </div>
      <MarketDataTable data={coinsList} />
      <PaginateComponent
        className={styles?.['pagination']}
        pageTotal={pageTotal}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        scrollToDiv
        scrollId="current-prices"
      />
    </>
  );
};
