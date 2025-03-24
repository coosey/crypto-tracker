import useTrendingList from "libs/hooks/useTrendingList";
import { TrendingCardSkeleton } from "../card-skeleton";
import { TrendingCardItem } from "../card-item";
import { formatNumberWithSubscriptZeros } from "libs/helpers/formatNumbersWithSubscript";

interface Props {
  limit?: number;
}

export const TrendingCardList = ({limit}: Props) => {
  const { trendingList, loading } = useTrendingList();

  const trendingCoins = trendingList?.coins?.slice?.(0, limit);

  return (
    <>
      <TrendingCardSkeleton isLoading={loading} />
      {!loading &&
        trendingCoins?.map?.((coin) => {
          const item = coin?.item;
          return (
            <TrendingCardItem
              key={item?.coin_id}
              name={item?.name}
              imgAlt={item?.name}
              imgSrc={item?.thumb}
              marketPrice={formatNumberWithSubscriptZeros(
                item?.data?.price?.toString?.()
              )}
              percentageChange={item?.data?.price_change_percentage_24h?.usd}
            />
          );
        })}
    </>
  )
};