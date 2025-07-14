import { TrendingListResponse } from 'libs/types/trending-list';
import { createApiHandler } from 'libs/utils/apiHandler';

export default createApiHandler<TrendingListResponse>({
  url: `${process.env.NEXT_PRIVATE_COINGECKO_API_URL}/search/trending`,
  headers: {
    'x-cg-demo-api-key': process.env.NEXT_PRIVATE_COINGECKO_KEY,
  },
  cacheConfig: {
    enabled: true,
  },
});
