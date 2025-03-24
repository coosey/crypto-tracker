import { 
  TrendingListResponse, 
  NormalizedTrendList, 
  TrendListVariant
} from "../types/trending-list";

export function normalizeTrendList(
  trendListResponse: TrendingListResponse, 
  variant: TrendListVariant
): NormalizedTrendList[] {
  if (!trendListResponse) return [];

  const trendingCoins = trendListResponse?.coins?.map?.((coin) => {
    const item = coin?.item;
    return {
      key: item?.coin_id,
      name: item?.name,
      imgAlt: item?.name,
      imgSrc: item?.thumb,
      marketPrice: item?.data?.price?.toString?.(),
      percentageChange: item?.data?.price_change_percentage_24h?.usd,
    };
  });

  const trendingCategories = trendListResponse?.categories?.map?.((category) => {
    return {
      key: category?.id,
      name: category?.name,
      imgAlt: category?.name,
      imgSrc: null,
      marketPrice: null,
      percentageChange: category?.data?.market_cap_change_percentage_24h?.usd,
    };
  });

  if (variant === "coin") {
    return trendingCoins;
  } else if (variant === "category") {
    return trendingCategories;
  }
}