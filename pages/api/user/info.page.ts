import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { key, value} = req.body;

  try {
    res.status(200).json({ success: true, message: 'User data saved successfully!' });
  } catch (error) {
    res.status(400).json({ message: 'Failed to save user data' });
  }
}
