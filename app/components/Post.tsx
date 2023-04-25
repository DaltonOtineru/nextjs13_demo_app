'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { formatDate } from '@/lib/utils';
import { HeartIcon } from './Icons/Heart';

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
};

export default function Post({
  avatar,
  name,
  postTitle,
  id,
  comments,
  createdAt,
}: Props) {
  const queryClient = useQueryClient();

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
        <HeartIcon onClick={() => {}} fill={false} />
      </div>
    </div>
  );
}
