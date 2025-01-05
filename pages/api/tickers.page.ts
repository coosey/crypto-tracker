import axios from 'axios';
import { TickersResponse } from 'libs/types/tickers';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TickersResponse[]>
) {
  const { query } = req;
  const { page = 1, id } = query;
  const URL = `https://api.coingecko.com/api/v3/coins/${id}/tickers?include_exchange_logo=true&page=${page}?order=volume_desc&depth=true`
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
