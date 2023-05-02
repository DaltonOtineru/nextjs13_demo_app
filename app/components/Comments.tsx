'use client';
import { formatDate } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { PostType } from '../types/Post';
import { DeleteIcon } from './Icons/Delete';

type Props = {
  postId: string;
};

export default function Comments(postId: Props) {
  const { data: session } = useSession();
  const { user } = session || {};

  const fetchComments = async () => {
    const response = await axios.post('/api/posts/getComments', { postId });
    return response.data;
  };

  const { data } = useQuery<PostType>({
    queryFn: fetchComments,
    queryKey: ['comments'],
  });

  return (
    <>
      {data?.comments?.map((comment) => (
        <div
          key={comment?.id}
          className="border-[1px] border-gray-300 my-8 p-4 rounded-xl"
        >
          <div className="flex items-center gap-4">
            <Image
              className="rounded-full"
              width={36}
              height={36}
              src={comment?.user?.image}
              alt="User Avatar"
            />
            <div>
              <h3 className="font-semibold text-[#11181c]">
                {comment?.user?.name}
              </h3>
              <p className="text-[#687076] font-light">
                {formatDate(comment?.createdAt)}
              </p>
            </div>
          </div>
          <div className="my-8">
            <p className="break-all text-gray-900">{comment?.message}</p>
          </div>
          {/* {user && user?.email === comment?.user?.email && (
            <DeleteIcon onClick={() => {}} />
          )} */}
        </div>
      ))}
    </>
  );
}
