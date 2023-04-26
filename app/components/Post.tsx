'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { formatDate } from '@/lib/utils';
import { HeartIcon } from './Icons/Heart';
import axios, { AxiosError } from 'axios';
import { useSession } from 'next-auth/react';

type Props = {
  id: string;
  avatar: string;
  name: string;
  postTitle: string;
  createdAt: string;
  comments?: {
    createdAt: string;
    id: string;
    postId: string;
    userId: string;
  }[];
  likes?: [];
};

export default function Post({
  avatar,
  name,
  postTitle,
  id,
  comments,
  createdAt,
  likes,
}: Props) {
  const { data: session } = useSession();
  const { user } = session || {};
  const email = user?.email;

  const queryClient = useQueryClient();
  const alreadyLiked =
    (session && likes?.some((like: any) => like?.email === email)) || false;

  const { mutate } = useMutation(
    async (id: string) => await axios.post('/api/posts/addLike', { id, email }),
    {
      onError: (error) => {
        if (error instanceof AxiosError) {
          console.log('LIKE AXIOS ERROR');
        }
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries(['posts']);
        queryClient.invalidateQueries(['detail-post']);

        console.log('SUCCESS LIKE');
      },
    }
  );

  const addLike = async () => {
    mutate(id);
  };

  return (
    <div className="border-[1px] border-gray-300 my-8 p-4 rounded-xl">
      <div className="flex items-center gap-4">
        <Image
          className="rounded-full"
          width={36}
          height={36}
          src={avatar}
          alt="User Avatar"
        />
        <div>
          <h3 className="font-semibold text-[#11181c]">{name}</h3>
          <p className="text-[#687076] font-light">{formatDate(createdAt)} </p>
        </div>
      </div>
      <div className="my-8">
        <p className="break-all text-gray-900">{postTitle}</p>
      </div>
      <div className="flex gap-4 cursor-pointer items-center">
        <Link
          href={`/posts/${id}`}
          onClick={() => queryClient.invalidateQueries(['detail-post'])}
        >
          <p className="text-sm text-gray-500">{comments?.length} Comments</p>
        </Link>
        <div className="flex gap-1">
          <HeartIcon onClick={addLike} fill={alreadyLiked} />
          <span className="text-gray-500">{likes ? likes.length : '0'}</span>
        </div>
      </div>
    </div>
  );
}
