'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Image from 'next/image';
import { useState } from 'react';
import Toggle from './Toggle';
import { toast } from 'react-hot-toast';

type EditProps = {
  id: string;
  avatar: string;
  name: string;
  title: string;
  comments?: {
    id: string;
    postId: string;
    userId: string;
  }[];
};

export default function EditPost({
  avatar,
  name,
  title,
  comments,
  id,
}: EditProps) {
  const [toggle, setToggle] = useState(false);
  const queryClient = useQueryClient();
  let deletePostID: string = 'hello';

  //delete post
  const { mutate } = useMutation(
    async (id: string) => await axios.post('/api/posts/deletePost', { id }),
    {
      onError: (error) => {
        toast.error('An error occured', { id: deletePostID });
      },
      onSuccess: (data) => {
        toast.success(data?.data?.message, { id: deletePostID });
        queryClient.invalidateQueries(['auth-posts']);
      },
    }
  );

  const deletePost = () => {
    deletePostID = toast.loading('Deleting Post', { id: deletePostID });
    mutate(id);
  };
  return (
    <>
      <div className="bg-white my-8 p-8 rounded-lg">
        <div className="flex items-center gap-2">
          <Image
            className="rounded-full"
            width={32}
            height={32}
            src={avatar}
            alt="User Avatar"
          />
          <h3 className="font-bold text-gray-700">{name}</h3>
        </div>
        <div className="my-8">
          <p className="break-all">{title}</p>
        </div>
        <div className="flex items-center gap-4">
          <p className="text-sm font-bold text-gray-700">
            {comments?.length} Comments
          </p>
          <button
            onClick={(e) => setToggle(true)}
            className="text-sm font-bold text-red-500"
          >
            Delete
          </button>
        </div>
      </div>
      {toggle && <Toggle deletePost={deletePost} setToggle={setToggle} />}
    </>
  );
}
