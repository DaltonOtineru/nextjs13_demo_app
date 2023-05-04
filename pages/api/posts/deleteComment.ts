import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import prisma from '@/prisma/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const session = await getServerSession(req, res, authOptions);
    const prismaUser = await prisma.user.findUnique({
      where: {
        email: session?.user?.email || '',
      },
    });
    if (!prismaUser) {
      res.status(403).json({ message: 'Please sign in to delete comment' });
    }

    const postId: string = req.body.postId;
    const commentId: string = req.body.commentId;

    try {
      const result = await prisma.comment.deleteMany({
        where: {
          postId,
          id: commentId,
        },
      });
      res.status(200).json({ result, message: 'Comment Deleted' });
    } catch (error) {
      res.status(403).json({ error: 'Error deleting comment' });
    }
  }
}
