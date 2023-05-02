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
    (session && likes?.some((like: any) => like?.email === currentUserEmail)) ||
    false;

  // add or remove like mutation
  const { mutate: handleLike } = useMutation(
    async (id: string) =>
      await axios.post('/api/posts/addLike', { id, currentUserEmail }),
    {
      onError: (error) => {
        if (error instanceof AxiosError) {
          console.log('LIKE AXIOS ERROR');
          setTimeout(() => {
            setLoading(false);
          }, 1000);
          toast.success(error.message);
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
    setLoading(true);
    handleLike(id);
  };

  // run delete post mutation
  const deletePost = async () => {
    handleDelete(id);
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
        <p className=" text-gray-900">{postTitle}</p>
      </div>
      <div className="flex gap-4 cursor-pointer items-center">
        <Link
          href={`/posts/${id}`}
          onClick={() => queryClient.invalidateQueries(['detail-post'])}
        >
          <p className="text-sm text-gray-500">{comments?.length} Comments</p>
        </Link>
        <div className="flex gap-1">
          {loading ? (
            <div className="like__loader" />
          ) : (
            <HeartIcon onClick={addLike} fill={alreadyLiked} />
          )}

          <span
            className={`${
              likes?.length !== 0 ? 'text-[#F31260]' : 'text-gray-500'
            }`}
          >
            {likes ? likes.length : '0'}
          </span>
        </div>
        {email === currentUserEmail && (
          <DeleteIcon onClick={() => setToggle(true)} />
        )}
      </div>
      {toggle && <Toggle deletePost={deletePost} setToggle={setToggle} />}
    </div>
  );
}
