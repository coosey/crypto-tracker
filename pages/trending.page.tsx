import { Layout } from 'components/layout';
import { observer } from 'mobx-react';
import { MarketDataTable } from 'components/market-data-table';
import useTrendingList from 'libs/hooks/useTrendingList';
import { TrendingCoinsResponse } from 'libs/types/trending-list';
import { BreadCrumbItems } from 'components/coin-id-components/breadcrumb-items';
import styles from './styles/trending.module.scss';
import { TableData } from 'libs/types/market-data-table';

const TrendingPage = () => {
  const { trendingList } = useTrendingList();

  const tableData = transformTableData(trendingList?.coins);

  return (
    <Layout>
      <BreadCrumbItems
        name={`Today's Top Trending Cryptocurrencies`} 
      />
      <div className={styles?.['trendingPageHeader']}>
        <h2>Today's Top Trending Cryptocurrencies</h2>
        <p>
          Listed below are the hottest trending cryptocurrencies. These are the coins and tokens
          that have the most visibility in the last 3 hours across the site.
        </p>
      </div>
      <MarketDataTable data={tableData} />
    </Layout>
  );
};

function parseStringNumber(input: string) {
  // Remove all non-numeric characters (except digits and '.')
  const numericString = input.replace(/[^0-9.]/g, '');
  // Return converted number
  return parseFloat(numericString);
}

function transformTableData(responseList: TrendingCoinsResponse[]): TableData[] {
  return responseList?.map?.((coin) => ({
    id: coin?.item?.id || '',
    name: coin?.item?.name || '',
    symbol: coin?.item?.symbol || '',
    image: coin?.item?.thumb || '',
    current_price: coin?.item?.data?.price || 0,
    price_change_percentage_1h_in_currency: null,
    price_change_percentage_24h_in_currency:
      coin?.item?.data?.price_change_percentage_24h?.usd || 0,
    price_change_percentage_7d_in_currency: null,
    total_volume: parseStringNumber(coin?.item?.data?.total_volume) || null,
    market_cap: parseStringNumber(coin?.item?.data?.market_cap) || null,
    market_cap_rank: coin?.item?.market_cap_rank || null,
  }));
}

export default observer(TrendingPage);
