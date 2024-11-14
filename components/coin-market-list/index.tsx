import { Pagination } from '@mantine/core';
import styles from './index.module.scss';
import { MarketDataTable } from 'components/market-data-table';
import { useState } from 'react';
import { useGetMarketData } from 'libs/hooks/useGetMarketData';

export const CoinMarketList = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const {coinsList, pageTotal} = useGetMarketData(currentPage);

  const handlePageChange = (pageNum: number) => {
    setCurrentPage(pageNum);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <div className={styles?.['title']}>
        <h1>Today's Cryptocurrency Prices</h1>
      </div>
      <MarketDataTable data={coinsList} />
      <div className={styles?.['pagination']}>
        <Pagination
          total={pageTotal}
          value={currentPage}
          onChange={handlePageChange}
        />
      </div>
    </>
  );
};
