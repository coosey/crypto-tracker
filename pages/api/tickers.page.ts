import { TickersResponse } from 'libs/types/tickers';
import { createApiHandler } from 'libs/utils/apiHandler';

export default createApiHandler<TickersResponse[]>({
  url: `${process.env.NEXT_PRIVATE_COINGECKO_API_URL}/coins/{id}/tickers?include_exchange_logo=true&page={page}&order=volume_desc&depth=true`,
  headers: {
    'x-cg-demo-api-key': process.env.NEXT_PRIVATE_COINGECKO_KEY,
  },
  cacheConfig: {
    enabled: true,
  },
  queryDefaults: {
    page: 1,
    per_page: 10,
  },
  requiredParams: ['id'],
});
