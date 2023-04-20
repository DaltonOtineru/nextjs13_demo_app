import prisma from '../../../prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ message: 'Please sign in!' });
    }

    // get auth users posts
    try {
      const data = await prisma.user.findUnique({
        where: {
          email: session?.user?.email || '',
        },
        include: {
          posts: {
            orderBy: {
              createdAt: 'desc',
            },
            include: {
              comments: true,
            },
          },
        },
      });
      return res.status(200).json(data);
    } catch (err) {
      res.status(403).json({ err: 'An error occurred' });
    }
  }
}