import { TrendingCardSkeleton } from '../card-skeleton';
import { TrendingCardItem } from '../card-item';
import { formatNumberWithSubscriptZeros } from 'libs/helpers/formatNumbersWithSubscript';
import { NormalizedTrendList } from 'libs/types/trending-list';

interface Props {
  limit?: number;
  loading: boolean;
  trendingList: NormalizedTrendList[];
}

export const TrendingCardList = ({ limit, loading, trendingList }: Props) => {
  const parsedTrendList = trendingList?.slice?.(0, limit);

  if (loading) {
    return <TrendingCardSkeleton />;
  }

  return (
    <>
      {parsedTrendList?.map?.((item) => {
        return (
          <TrendingCardItem
            key={item?.key}
            name={item?.name}
            imgAlt={item?.imgAlt}
            imgSrc={item?.imgSrc}
            marketPrice={formatNumberWithSubscriptZeros?.(item?.marketPrice)}
            percentageChange={item?.percentageChange}
          />
        );
      })}
    </>
  );
};
