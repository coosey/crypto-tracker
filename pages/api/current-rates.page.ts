import { TrendingCoinsResponse } from 'libs/types/trending-list';
import { createApiHandler } from 'libs/utils/apiHandler';

export default createApiHandler<TrendingCoinsResponse>({
  url: `${process.env.NEXT_PRIVATE_COINGECKO_API_URL}/coins/price_percentage_change`,
  headers: {
    'x-cg-demo-api-key': process.env.NEXT_PRIVATE_COINGECKO_KEY,
  },
  cacheConfig: {
    enabled: true,
  },
  requiredParams: ['id'],
});


