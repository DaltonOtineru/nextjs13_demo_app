'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-hot-toast';
import { useSession } from 'next-auth/react';

export default function AddPost() {
  const { data: session } = useSession();
  const { user } = session || {};

  const [title, setTitle] = useState<string>('');
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [outline, setOutline] = useState<boolean>(false);
  const queryClient = useQueryClient();
  let toastPostID: string = 'hello';

  const { mutate } = useMutation(
    async (title: string) => await axios.post('/api/posts/addPost', { title }),
    {
      onError: (error) => {
        if (error instanceof AxiosError) {
          toast.error(error?.response?.data.message, { id: toastPostID });
          setTimeout(() => {
            setIsDisabled(false);
          }, 3000);
        }
      },
      onSuccess: (data) => {
        setTitle('');
        toast.success(data?.data?.message, { id: toastPostID });
        queryClient.invalidateQueries(['posts']);
        setTimeout(() => {
          setIsDisabled(false);
        }, 3000);
      },
    }
  );

  const submitPost = async (e: React.FormEvent) => {
    e.preventDefault();
    toastPostID = toast.loading('Creating your post', { id: toastPostID });
    setIsDisabled(true);
    mutate(title);
  };

  return (
    <form onSubmit={submitPost}>
      <div className="flex flex-col my-4 rounded-md">
        {!user && <h3>Please sign in to post</h3>}
        <textarea
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setTitle(e.target.value)
          }
          name="title"
          value={title}
          onMouseEnter={() => setOutline(true)}
          onMouseLeave={() => setOutline(false)}
          placeholder="What's on your mind?"
          className={`p-4 text-lg rounded-xl mt-2 border-2 border-gray-300 focus:outline-none resize-none focus:border-black transition-all duration-300 ease ${
            !user && 'cursor-not-allowed'
          } ${outline && '!border-black'}`}
        />
      </div>
      <div className="space-y-2 flex items-center justify-between -mt-2">
        <button
          disabled={isDisabled}
          className={`text-md bg-blue-600 text-white py-3 px-6 rounded-xl text-sm disabled:opacity-25 min-w-[12rem] ${
            !user && 'bg-[#ECEEF0] text-[#7E868C] cursor-default'
          }`}
          type="submit"
        >
          Post
        </button>
        <p
          className={`${
            title.length > 300 && '!text-red-700'
          } font-bold text-sm text-gray-700`}
        >
          {title.length}/300
        </p>
      </div>
    </form>
  );
}
