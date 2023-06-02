'use client';

import AddComment from '@/app/components/AddComment';
import Comments from '@/app/components/Comments';
import Loader from '@/app/components/Loader';
import Post from '@/app/components/Post';
import { PostType } from '@/app/types/Post';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';
import { BsArrowLeft } from 'react-icons/bs';

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
    cacheTime: 0,
  });

  if (isLoading) return <Loader />;

  return (
    <main className="w-full flex flex-col items-center px-6 sm:px-0 my-4">
      <div className="max-w-xl w-full">
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-transparent text-6xl bg-clip-text bg-gradient-to-tr  from-[20%] from-[#FF4ECD] to-70% to-[#0072F5] w-fit">
            Thread
          </h1>
          <Link
            href="/posts"
            className="flex px-6 py-3 rounded-xl text-white bg-gradient-to-tr from-[20%] from-[#FF4ECD] to-70% to-[#0072F5]"
          >
            <BsArrowLeft className="text-2xl font-bold" />
          </Link>
        </div>
        <Post
          id={data?.id!}
          name={data?.user.name!}
          avatar={data?.user.image!}
          subStatus={data?.user.subscriptionStatus}
          postTitle={data?.title!}
          comments={data?.comments}
          createdAt={data?.createdAt!}
          likes={data?.likes}
          email={data?.user?.email!}
        />
        <AddComment id={data?.id} />
        <Comments postId={url.params.slug} />
      </div>
    </main>
  );
}
