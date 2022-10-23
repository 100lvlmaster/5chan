import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

export const createPost = async (req: NextApiRequest, res: NextApiResponse) => {
  const prisma = new PrismaClient();
  const post = await prisma.post.create({ data: req.body });
  res.send(post);
};
