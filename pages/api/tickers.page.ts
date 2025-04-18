import { TickersResponse } from 'libs/types/tickers';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TickersResponse[]>
) {
  const { query } = req;
  const { page = 1, id } = query;

  const URL = `${process.env.NEXT_PUBLIC_COINGECKO_API_URL}/coins/${id}/tickers?include_exchange_logo=true&page=${page}&order=volume_desc&depth=true`;
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
