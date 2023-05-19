'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { PostType } from '../types/Post';
import Comment from './Comment';

type Props = {
  postId: string;
};

export default function Comments(postId: Props) {
  const fetchComments = async () => {
    const response = await axios.post('/api/posts/getComments', { postId });
    return response.data;
  };

  const { data, isLoading } = useQuery<PostType>({
    queryFn: fetchComments,
    queryKey: ['comments'],
    cacheTime: 0,
  });

  return (
    <>
      {!isLoading &&
        data?.comments?.map((comment) => (
          <Comment comment={comment} key={comment?.id} />
        ))}
    </>
  );
}
