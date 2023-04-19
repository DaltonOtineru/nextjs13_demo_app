import prisma from '../../../prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res
        .status(401)
        .json({ message: 'You must be signed in to make a post!' });
    }

    const title: string = req.body.title;

    // get user
    const prismaUser = await prisma.user.findUnique({
      where: { email: session?.user?.email || '' },
    });

    // check if user
    if (!prismaUser) {
      return res.status(403).json({
        message: 'Please sign in to make a post!',
      });
    }

    // check title
    if (title.length > 300) {
      return res.status(403).json({
        message: 'Please write a shorter post!',
      });
    }
    if (!title.length) {
      return res.status(403).json({
        message: 'Post cannot be empty!',
      });
    }

    // create post
    try {
      const result = await prisma.post.create({
        data: {
          title,
          userId: prismaUser.id,
        },
      });
      res.status(200).json({ result, message: 'Post Created! ✨' });
    } catch (err) {
      res.status(403).json({ err: 'Error has occurerd while creating post' });
    }
  }
}
