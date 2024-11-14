import axios from "axios";
import { TrendingListResponse } from "libs/types/trending-list";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TrendingListResponse>
) {
  const URL = 'https://api.coingecko.com/api/v3/search/trending';
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
