import { NewsApiResponse } from 'libs/types/news';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse<NewsApiResponse>) {
  const { id, symbol } = req.query;
  // get the current date
  const today = new Date();
  // subtract two day to get desired date
  const previousDate = new Date(today);
  previousDate.setDate(today.getDate() - 2);

  const year = previousDate.getFullYear();
  // Months are zero-based
  const month = String(previousDate.getMonth() + 1).padStart(2, '0');
  const day = String(previousDate.getDate()).padStart(2, '0');
  // format the date as yyyy-mm-dd
  const formattedDate = `${year}-${month}-${day}`;

  const query = `${id}+${symbol}`;

  const URL = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&from=${formattedDate}&sortBy=publishedAt&language=en&apiKey=${process.env.NEXT_PRIVATE_NEWS_API_KEY}`;
  console.log('URL', URL);
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
