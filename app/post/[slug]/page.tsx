'use client';

import AddComment from '@/app/components/AddComment';
import Comments from '@/app/components/Comments';
import Post from '@/app/components/Post';
import { PostType } from '@/app/types/Post';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

type URL = {
  params: {
    slug: string;
  };
};

export default function PostDetail(url: URL) {
  const fetchDetails = async (slug: string) => {
    const response = await axios.get(`/api/posts/${slug}`);
    return response.data;
  };

  const { data, isLoading } = useQuery<PostType>({
    queryKey: ['detail-post'],
    queryFn: () => fetchDetails(url.params.slug),
  });
  if (isLoading) return 'Loading...';

  return (
    <div>
      <Post
        id={data?.id!}
        name={data?.user.name!}
        avatar={data?.user.image!}
        postTitle={data?.title!}
        comments={data?.comments}
      />
      <AddComment id={data?.id} />
      <Comments postId={url.params.slug} />
    </div>
  );
}
