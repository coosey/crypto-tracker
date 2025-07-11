import { TrendingCardSkeleton } from '../card-skeleton';
import { TrendingCardItem } from '../card-item';
import { formatWithSubscriptZeros } from 'libs/helpers/formatNumbersWithSubscript';
import { NormalizedTrendList } from 'libs/types/trending-list';
import { useRouter } from 'next/router';

interface Props {
  limit?: number;
  loading: boolean;
  trendingList: NormalizedTrendList[];
}

export const TrendingCardList = ({ limit, loading, trendingList }: Props) => {
  const router = useRouter();
  const parsedTrendList = trendingList?.slice?.(0, limit);

  if (loading) {
    return <TrendingCardSkeleton />;
  }

  return (
    <>
      {parsedTrendList?.map?.((item) => {
        return (
          <TrendingCardItem
            hasHover={!!item?.id}
            onClick={() => item?.id && router.push(`/coin/${item?.id}`)}
            key={item?.key}
            name={item?.name}
            imgAlt={item?.imgAlt}
            imgSrc={item?.imgSrc}
            marketPrice={formatWithSubscriptZeros?.(Number(item?.marketPrice))}
            percentageChange={item?.percentageChange}
          />
        );
      })}
    </>
  );
};
