'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { formatDate } from '@/lib/utils';
import { HeartIcon } from './Icons/Heart';
import axios, { AxiosError } from 'axios';
import { useSession } from 'next-auth/react';
import { toast } from 'react-hot-toast';
import { useState } from 'react';
import { DeleteIcon } from './Icons/Delete';
import Toggle from '../dashboard/Toggle';
import { useRouter, useSelectedLayoutSegment } from 'next/navigation';

type Props = {
  id: string;
  avatar: string;
  name: string;
  postTitle: string;
  createdAt: string;
  email: string;
  comments?: {
    createdAt: string;
    id: string;
    postId: string;
    userId: string;
  }[];
  likes?: [];
};

type Likes = {
  id: string;
  postId: string;
  userId: string;
  email: string;
};

export default function Post({
  avatar,
  name,
  postTitle,
  id,
  comments,
  createdAt,
  likes,
  email,
}: Props) {
  const { data: session } = useSession();
  const { user } = session || {};
  const currentUserEmail = user?.email;

  const [loading, setLoading] = useState<boolean>(false);
  const [toggle, setToggle] = useState<boolean>(false);

  const queryClient = useQueryClient();
  const segment = useSelectedLayoutSegment();
  const router = useRouter();

  // check if the user has already liked the current post
  const alreadyLiked =
    (session &&
      likes?.some((like: Likes) => like?.email === currentUserEmail)) ||
    false;

  // add or remove like mutation
  const { mutate: handleLike } = useMutation(
    async (id: string) =>
      await axios.post('/api/posts/addLike', { id, currentUserEmail }),
    {
      onError: (error) => {
        if (error instanceof AxiosError) {
          setTimeout(() => {
            setLoading(false);
          }, 1000);
          toast.error(error?.response?.data.message);
        }
      },
      onSuccess: ({ data }) => {
        queryClient.invalidateQueries(['posts']);
        queryClient.invalidateQueries(['detail-post']);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
        toast.success(data.message);
      },
    }
  );

  const { mutate: handleDelete } = useMutation(
    async (id: string) => await axios.post('/api/posts/deletePost', { id }),
    {
      onError: (error) => {
        if (error instanceof AxiosError) {
          console.log('POST DELETE ERROR', error.message);
        }
      },
      onSuccess: ({ data }) => {
        if (segment !== 'posts') {
          router.push('/posts');
        }
        queryClient.invalidateQueries(['posts']);
        queryClient.invalidateQueries(['detail-post']);
        toast.success(data.message);
      },
    }
  );

  // set loading and run like mutation
  const addLike = async () => {
    if (user) {
      setLoading(true);
      handleLike(id);
    }
  };

  // run delete post mutation
  const deletePost = async () => {
    handleDelete(id);
  };

  return (
    <div className="bg-[#16181A] border-[1px] border-white border-opacity-20 my-8 p-4 rounded-xl">
      <div className="flex items-center gap-4">
        <div className="rounded-full w-[42px] h-[42px] flex items-center justify-center  from-[#102C4C] via-[#AD007C] to-[#571D91] ">
          <Image
            className="rounded-full"
            width={36}
            height={36}
            src={avatar}
            alt="User Avatar"
          />
        </div>
        <div>
          <h3 className="font-semibold text-[#ecedee]">{name}</h3>
          <p className="text-[#9BA1A6] font-light">{formatDate(createdAt)} </p>
        </div>
      </div>
      <div className="my-8">
        <p className=" text-[#ecedee]">{postTitle}</p>
      </div>
      <div className="flex gap-4 cursor-pointer items-center">
        <Link
          href={`/posts/${id}`}
          onClick={() => queryClient.invalidateQueries(['detail-post'])}
        >
          <p className="text-sm text-[#9BA1A6]">
            {comments?.length} {comments?.length === 1 ? 'Comment' : 'Comments'}
          </p>
        </Link>
        <div className="flex gap-1">
          {loading ? (
            <div className="like__loader" />
          ) : (
            <HeartIcon onClick={addLike} fill={alreadyLiked} />
          )}

          <span
            className={`${
              likes?.length !== 0 && alreadyLiked
                ? 'text-[#F31260]'
                : 'text-[#9BA1A6]'
            }`}
          >
            {likes ? likes.length : '0'}
          </span>
        </div>
        {email === currentUserEmail && (
          <DeleteIcon onClick={() => setToggle(true)} />
        )}
      </div>
      {toggle && (
        <Toggle deleteFunction={deletePost} setToggle={setToggle} text="post" />
      )}
    </div>
  );
}
