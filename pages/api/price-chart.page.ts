import { PriceChart } from 'libs/types/price-chart';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse<PriceChart>) {
  const { query } = req;
  const { id } = query;

  const URL = `${process.env.NEXT_PRIVATE_COINGECKO_API_URL}/coins/${id}/market_chart?vs_currency=usd&days=7`;
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
