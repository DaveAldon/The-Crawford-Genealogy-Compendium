import { NextApiRequest, NextApiResponse } from 'next';
import { getGeneology } from '../../lib/atlas';

export default async (_: NextApiRequest, res: NextApiResponse) => {
  const result = await getGeneology();
  console.log('get result', result);
  res.status(200).json({ text: 'Hello' });
};
