import prisma from '@/prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userId = req.query.userId;
  const user = await prisma.user.findUnique({
    where: {
      id: userId as string,
    },
  });

  res.status(200).json({
    id: user?.id,
    email: user?.email,
    subscriptionStatus: user?.subscriptionStatus || 'none',
  });
}
