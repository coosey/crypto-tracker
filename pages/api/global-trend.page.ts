import { GlobalMarketTrend } from 'libs/types/trending-list';
import { createApiHandler } from 'libs/utils/apiHandler';

export default createApiHandler<GlobalMarketTrend>({
  url: `${process.env.NEXT_PRIVATE_COINGECKO_API_URL}/global`,
  headers: {
    'x-cg-demo-api-key': process.env.NEXT_PRIVATE_COINGECKO_KEY,
  },
  cacheConfig: {
    enabled: true,
  },
});
