import { PriceChart } from 'libs/types/price-chart';
import { createApiHandler } from 'libs/utils/apiHandler';

export default createApiHandler<PriceChart>({
  url: `${process.env.NEXT_PRIVATE_COINGECKO_API_URL}/coins/{id}/market_chart?vs_currency=usd&days=7`,
  headers: {
    'x-cg-demo-api-key': process.env.NEXT_PRIVATE_COINGECKO_KEY,
  },
  cacheConfig: {
    enabled: true,
  },
  requiredParams: ['id'],
});
