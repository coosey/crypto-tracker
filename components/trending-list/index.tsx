import { TrendingCard } from './card';
import { TrendingCardList } from './card-list';
import { TrendingCoinTitleLink } from './coin-title-link';
import useTrendingList from 'libs/hooks/useTrendingList';
import { normalizeTrendList } from 'libs/helpers/normalizeTrendList';
import { GlobalTrendPrice } from 'components/global-trend-price';
import styles from './index.module.scss';
import { GlobalMarketTrend } from 'libs/types/trending-list';

interface Props {
  globalTrend: GlobalMarketTrend;
}

export const TrendingList = ({
  globalTrend
}: Props) => {

  const { trendingList, loading } = useTrendingList();

  const trendingCoins = normalizeTrendList(trendingList, 'coin');
  const trendingCategories = normalizeTrendList(trendingList, 'category');


  return (
    <div className={styles?.['trendingList']}>
      <GlobalTrendPrice globalTrend={globalTrend} />
      <TrendingCard>
        {{
          titleLink: <TrendingCoinTitleLink title="Trending Coins" hasViewMore />,
          body: <TrendingCardList limit={3} loading={loading} trendingList={trendingCoins} />,
        }}
      </TrendingCard>
      <TrendingCard>
        {{
          titleLink: <TrendingCoinTitleLink title="Categories" />,
          body: <TrendingCardList limit={3} loading={loading} trendingList={trendingCategories} />,
        }}
      </TrendingCard>
    </div>
  );
};
