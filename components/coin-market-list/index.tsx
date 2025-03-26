import styles from './index.module.scss';
import { MarketDataTable } from 'components/market-data-table';
import { useState } from 'react';
import { useGetMarketData } from 'libs/hooks/useGetMarketData';
import { PaginateComponent } from 'components/pagination';
import { transformData } from 'libs/helpers/transformData';

export const CoinMarketList = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { coinsList, pageTotal } = useGetMarketData(currentPage);

  const coinsListTableData = transformData(coinsList, (coin) => ({
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

  return (
    <>
      <div className={styles?.['title']}>
        <h1 id="current-prices">Today's Cryptocurrency Prices</h1>
      </div>
      <MarketDataTable data={coinsListTableData} />
      <div className={styles?.['paginationWrapper']}>
        <PaginateComponent
          className={styles?.['paginationWrapper__content']}
          pageTotal={pageTotal}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          scrollToDiv
          scrollId="current-prices"
        />
      </div>
    </>
  );
};
