'use client';
import axios from 'axios';
import AddPost from '../components/AddPost';
import { useQuery } from '@tanstack/react-query';
import Post from '../components/Post';
import { PostsType } from '../types/Posts';

const allPosts = async () => {
  const response = await axios.get('/api/posts/getPosts');
  return response.data;
};

type URL = {
  params: {
    slug: string;
  };
};

export default function Home(url: URL) {
  const { data, error, isLoading } = useQuery<PostsType[]>({
    queryFn: allPosts,
    queryKey: ['posts'],
  });
  if (error) return error;
  if (isLoading)
    return (
      <div className="flex h-[50vh] w-screen items-center justify-center">
        <div className="loader"></div>
      </div>
    );

  return (
    <main className="w-full flex flex-col items-center px-6 sm:px-0 py-4">
      <div className="max-w-xl w-full">
        <h1 className="font-bold text-transparent text-6xl bg-clip-text bg-gradient-to-tr from-[#0072F5] from-20% to-[#FF4ECD] to-70% w-fit my-2">
          Feed
        </h1>
        <AddPost />
        {data?.map((post) => (
          <Post
            key={post.id}
            name={post.user.name}
            avatar={post.user.image}
            postTitle={post.title}
            comments={post.comments}
            id={post.id}
            createdAt={post.createdAt}
            likes={post.likes}
          />
        ))}
      </div>
    </main>
  );
}
