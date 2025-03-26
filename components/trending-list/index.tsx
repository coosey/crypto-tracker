import { TrendingCard } from './card';
import { TrendingCardList } from './card-list';
import { TrendingCoinTitleLink } from './coin-title-link';
import useTrendingList from 'libs/hooks/useTrendingList';
import { normalizeTrendList } from 'libs/helpers/normalizeTrendList';
import styles from './index.module.scss';

export const TrendingList = () => {
  const { trendingList, loading } = useTrendingList();
  const trendingCoins = normalizeTrendList(trendingList, 'coin');
  const trendingCategories = normalizeTrendList(trendingList, 'category');

  return (
    <div className={styles?.['trendingList']}>
      <TrendingCard>
        {{
          titleLink: <TrendingCoinTitleLink title="Trending Coins" hasViewMore />,
          list: <TrendingCardList limit={3} loading={loading} trendingList={trendingCoins} />,
        }}
      </TrendingCard>
      <TrendingCard>
        {{
          titleLink: <TrendingCoinTitleLink title="Categories" />,
          list: <TrendingCardList limit={3} loading={loading} trendingList={trendingCategories} />,
        }}
      </TrendingCard>
    </div>
  );
};
