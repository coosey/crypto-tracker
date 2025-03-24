import { CoinsListResponse } from '@libs/types/coins-list';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CoinsListResponse[]>
) {
  // currently defaulting params for vs_currency, order, price_change_percentage, locale, & precision
  const { query } = req;
  const { page = 1 } = query;
  const URL = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=${page}&price_change_percentage=1h%2C24h%2C7d&locale=en`;
  try {
    const response = await fetch(URL, {
      headers: {
        'content-type': 'application/json',
        'x-cg-demo-api-key': process.env.NEXT_PRIVATE_COINGECKO_KEY,
      },
    });
    const data = await response.json();
    res.status(200).send(data);
  } catch (error) {
    res.status(error?.status || 400).send(error);
  }
}
