// /pages/api/proxy.ts
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const response = await fetch('https://www.freetogame.com/api/games?platform=pc');
  const data = await response.json();

  res.status(200).json(data);
};

export default handler;
