import { retrieveDatas } from '@/utils/db/service';
import { NextApiRequest, NextApiResponse } from 'next';

type data = {
  statusCode: number;
  data: any;
};
export default async function products(req: NextApiRequest, res: NextApiResponse<data>) {
  const data = await retrieveDatas('products');
  res.status(200).json({ statusCode: 200, data: data });
}
