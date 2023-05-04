import prisma from '../../../prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { Likes } from '@/app/types/Likes';

type Like = {
  id: string;
  postId: string;
  userId: string;
  email: string;
}[];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ message: 'Please sign in to like posts!' });
    }

    // get user
    const prismaUser = await prisma.user.findUnique({
      where: { email: session?.user?.email || '' },
    });

    // check if user
    if (!prismaUser) {
      return res.status(403).json({
        message: 'Please sign in to like posts!',
      });
    }

    const userId: string = prismaUser.id;
    const postId: string = req.body.id;
    const email: string = req.body.currentUserEmail;

    // either create like or delete like depending on if user
    // has already liked the current post
    try {
      const { likes }: Likes | any = await prisma.post.findUnique({
        where: {
          id: postId,
        },
        select: {
          likes: true,
        },
      });

      const alreadyLiked: boolean =
        session && likes?.some((like: any) => like?.userId === userId);

      if (!alreadyLiked) {
        const result = await prisma.like.create({
          data: {
            userId: prismaUser.id,
            postId,
            email,
          },
        });
        res.status(200).json({ result, message: 'Liked Post! ✨' });
      }

      if (alreadyLiked) {
        const result = await prisma.like.deleteMany({
          where: {
            userId: prismaUser.id,
            postId: postId,
          },
        });
        res.status(200).json({ result, message: 'Your like was removed! 😱' });
      }
    } catch (err) {
      res.status(403).json({ err: 'Error has occurerd while liking the post' });
    }
  }
}
