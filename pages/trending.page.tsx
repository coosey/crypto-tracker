import { Layout } from 'components/layout';
import { observer } from 'mobx-react';
import { TrendingList } from 'components/trending-list';
import { MarketDataTable } from 'components/market-data-table';

const TrendingPage = () => {
  return (
    <Layout>
      <MarketDataTable data={[]} />
    </Layout>
  );
};

// export const getServerSideProps = () => {
  
// }

export default observer(TrendingPage);
