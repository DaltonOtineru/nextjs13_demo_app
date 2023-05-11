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
        .json({ message: 'You must be signed in to comment!' });
    }

    // get user
    const prismaUser = await prisma.user.findUnique({
      where: { email: session?.user?.email || '' },
    });

    // check if user
    if (!prismaUser) {
      return res.status(403).json({
        message: 'You must be signed in to comment!',
      });
    }

    const title: string = req.body.title;
    const postId: string = req.body.id;

    // check title
    if (title.length > 300) {
      return res.status(403).json({
        message: 'Please write a shorter comment!',
      });
    }
    if (!title.length) {
      return res.status(403).json({
        message: 'Comment cannot be empty!',
      });
    }

    // create comment
    try {
      const result = await prisma.comment.create({
        data: {
          message: title,
          userId: prismaUser.id,
          postId,
        },
      });

      res.status(200).json({ result, message: 'Comment posted! ✨' });
    } catch (err) {
      res
        .status(403)
        .json({ err: 'Error has occurerd while creating comment' });
    }
  }
}
