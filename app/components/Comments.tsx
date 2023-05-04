'use client';
import { formatDate } from '@/lib/utils';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { PostType } from '../types/Post';
import { DeleteIcon } from './Icons/Delete';
import Comment from './Comment';

type Props = {
  postId: string;
};

export default function Comments(postId: Props) {
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
        <Comment comment={comment} key={comment?.id} />
      ))}
    </>
  );
}
