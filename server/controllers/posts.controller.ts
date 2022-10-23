import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

export const createPost = async (req: NextApiRequest, res: NextApiResponse) => {
  const prisma = new PrismaClient();
  const post = await prisma.post.create({ data: req.body });
  res.send(post);
};

export const getPosts = async (req: NextApiRequest, res: NextApiResponse) => {
  const prisma = new PrismaClient();
  const posts = await prisma.post.findMany({
    orderBy: [
      {
        created_at: 'desc',
      },
    ],
  });
  res.send({ data: posts });
};
