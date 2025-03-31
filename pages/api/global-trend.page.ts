import { GlobalMarketTrend } from 'libs/types/trending-list';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GlobalMarketTrend>
) {
  try {
    const response = await fetch(`${process.env.NEXT_PRIVATE_COINGECKO_API_URL}/global`, {
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
