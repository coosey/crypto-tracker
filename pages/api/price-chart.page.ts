import axios from 'axios';
import { PriceChart } from 'libs/types/price-chart';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PriceChart>
) {
  const { query } = req;
  const { id } = query;

  const URL = `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7`;
  try {
    const response = await axios.get(URL, {
      headers: {
        accept: 'application/json',
        'x-cg-demo-api-key': process.env.NEXT_PRIVATE_COINGECKO_KEY,
      },
    });
    res.status(200).send(response?.data);
  } catch (error) {
    res.status(error?.status || 400).send(error);
  }
}
