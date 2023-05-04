'use client';
import { formatDate } from '@/lib/utils';
import Image from 'next/image';
import { DeleteIcon } from './Icons/Delete';
import { useSession } from 'next-auth/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Toggle from '../dashboard/Toggle';
import { useState } from 'react';

type Props = {
  comment: {
    createdAt: string;
    id: string;
    message: string;
    postId: string;
    title?: string;
    userId: string;
    user: {
      email: string;
      id: string;
      image: string;
      name: string;
    };
  };
};

export default function Comment({ comment }: Props) {
  const { data: session } = useSession();
  const { user } = session || {};
  const queryClient = useQueryClient();

  const [toggle, setToggle] = useState<boolean>(false);

  const commentId: string = comment?.id;

  const { mutate: handleDelete } = useMutation(
    async (postId: string) =>
      await axios.post('/api/posts/deleteComment', { postId, commentId }),
    {
      onError: (error) => {
        console.log(error);
      },
      onSuccess: ({ data }) => {
        queryClient.invalidateQueries(['comments']);
        console.log(data);
      },
    }
  );

  const deleteComment = async () => {
    handleDelete(comment.postId);
  };

  return (
    <>
      <div className="border-[1px] border-gray-300 my-8 p-4 rounded-xl">
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
        {user && user?.email === comment?.user?.email && (
          <DeleteIcon onClick={() => setToggle(true)} />
        )}
      </div>
      {toggle && (
        <Toggle
          deleteFunction={deleteComment}
          setToggle={setToggle}
          text="comment"
        />
      )}
    </>
  );
}
