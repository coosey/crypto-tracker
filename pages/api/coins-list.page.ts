import { CoinsListResponse } from 'libs/types/coins-list';
import { createApiHandler } from 'libs/utils/apiHandler';

export default createApiHandler<CoinsListResponse[]>({
  url: `${process.env.NEXT_PRIVATE_COINGECKO_API_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page={page}&price_change_percentage=1h%2C24h%2C7d&locale=en`,
  headers: {
    'x-cg-demo-api-key': process.env.NEXT_PRIVATE_COINGECKO_KEY,
  },
  cacheConfig: {
    enabled: true,
  },
  queryDefaults: {
    page: 1,
  },
});