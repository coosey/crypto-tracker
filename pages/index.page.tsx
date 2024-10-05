import {Layout} from "components/layout";
import {observer} from 'mobx-react';
import {CoinMarketList} from "components/coin-market-list";

const Home = (() => {
  return (
    <Layout>
      <CoinMarketList />
    </Layout>
  );
});

export default observer(Home);