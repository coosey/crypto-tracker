import { Layout } from 'components/layout';
import { observer } from 'mobx-react';
import {TrendingList} from 'components/trending-list';
import { MarketDataTable } from 'components/market-data-table';
import { useEffect } from 'react';
import axios from 'axios';

const TrendingPage = () => {
  
  // useEffect(() => {
  //   (async () => {
  //     const response = await axios.get('/api/current-rates', {params: { id: stringIds}})
  //   })()
  // }, []);

  return (
    <Layout>
      <MarketDataTable data={[]} />
    </Layout>
  );
};

export default observer(TrendingPage);
