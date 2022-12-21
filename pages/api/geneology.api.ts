import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb';
//import { getGenealogy } from '../../lib/atlas';

const geneology = async (_: NextApiRequest, _res: NextApiResponse) => {
  const client = await clientPromise;

  const db = client.db('geneology');
  let data = await db.collection('family tree').find({}).toArray();
  data = JSON.parse(JSON.stringify(data));

  return {
    props: { data },
  };
  /* const result = await getGenealogy();
  console.log('get result', result);
  res.status(200).json({ text: 'Hello' }); */
};

export default geneology;
