import {client} from 'libs/redis';
import { NextApiRequest, NextApiResponse } from 'next';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.body;
  const authHeader = req.headers.authorization;
  
  if (!authHeader) return res.status(401).end();

  try {
    const userId = authHeader.split(' ')[1];
    // const client = await getRedisClient();
    await client.hSet(`users:${userId}`, {
      email: '',
      isEmailVerified: 'false',
      favorites: '[]'
    })
    console.log('userId >>>', userId);
    // await client.set(key, value);
    res.status(200).json({ success: true, message: 'Successfully fetched user data!' });
  } catch (error) {
    res.status(400).send(error);
  }
}
