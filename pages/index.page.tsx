import { Layout } from '@components/layout';
import { observer } from 'mobx-react';
import { CoinMarketList } from '@components/coin-market-list';
import { TrendingList } from '@components/trending-list';

const Home = () => {
  return (
    <Layout>
      <TrendingList />
      <CoinMarketList />
    </Layout>
  );
};

export default observer(Home);
