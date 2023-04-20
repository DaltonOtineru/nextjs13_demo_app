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
      return res.status(401).json({ message: 'Please sign in!' });
    }
    // delete post
    try {
      const postId = req.body.id;
      const result = await prisma.post.delete({
        where: {
          id: postId,
        },
      });
      return res.status(200).json({ result, message: 'Post deleted!' });
    } catch (err) {
      res.status(403).json({ err: 'An error occurred trying to delete post' });
    }
  }
}
