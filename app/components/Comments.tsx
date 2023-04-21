'use client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { PostType } from '../types/Post';

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
        <div key={comment?.id}>
          <p>{comment?.message}</p>
        </div>
      ))}
    </>
  );
}
