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
  const [deleting, setDeleting] = useState<boolean>(false);

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
      },
    }
  );

  const deleteComment = async () => {
    setDeleting(true);
    handleDelete(comment.postId);
  };

  return (
    <>
      <div className="bg-[#16181A] border-[1px] border-white border-opacity-20 my-8 p-4 rounded-xl">
        <div className="flex items-center gap-4">
          <Image
            className="rounded-full"
            width={36}
            height={36}
            src={comment?.user?.image}
            alt="User Avatar"
          />
          <div>
            <h3 className="font-semibold text-[#ecedee]">
              {comment?.user?.name}
            </h3>
            <p className="text-[#9BA1A6] font-light">
              {formatDate(comment?.createdAt)}
            </p>
          </div>
        </div>
        <div className="my-8">
          <p className="break-all text-[#ecedee]">{comment?.message}</p>
        </div>
        {user && user?.email === comment?.user?.email && (
          <DeleteIcon onClick={() => setToggle(true)} />
        )}
      </div>
      {toggle && (
        <Toggle
          deleteFunction={deleteComment}
          setToggle={setToggle}
          deleting={deleting}
          text="comment"
        />
      )}
    </>
  );
}
