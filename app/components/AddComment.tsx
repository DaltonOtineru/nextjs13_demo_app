'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';

type PostProps = {
  id?: string;
};

export default function AddComment({ id }: PostProps) {
  const { data: session } = useSession();
  const { user } = session || {};

  const [title, setTitle] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const [outline, setOutline] = useState(false);

  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    async (title: string) =>
      await axios.post('/api/posts/addComment', { title, id }),
    {
      onError: (error) => {
        if (error instanceof AxiosError) {
          console.log('ERROR COMMENT', error);
          toast.error('There was an error with your comment!');
        }
      },
      onSuccess: (data) => {
        setTitle('');
        toast.success('Comment was posted!');
        queryClient.invalidateQueries(['comments']);
        queryClient.invalidateQueries(['detail-post']);
      },
    }
  );

  const submitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsDisabled(true);
    mutate(title);
    setTimeout(() => {
      setIsDisabled(false);
    }, 3000);
  };

  return (
    <form className="my-8" onSubmit={submitComment}>
      <div className="flex flex-col my-2 h-32">
        <textarea
          onChange={(e) => setTitle(e.target.value)}
          onMouseEnter={() => setOutline(true)}
          onMouseLeave={() => setOutline(false)}
          value={title}
          // type="text"
          name="title"
          role="textbox"
          placeholder="Comment here..."
          contentEditable
          className={`px-3 py-2 h-full text-lg rounded-xl my-2 focus:outline-none border-2 border-gray-300 resize-none transition-all duration-300 ease  ${
            outline && 'border-black'
          } focus:border-black`}
        />
      </div>
      <div className="gap-2 flex items-center justify-between">
        <button
          disabled={isDisabled}
          className={`text-md bg-blue-600 text-white py-3 px-6 rounded-xl disabled:opacity-25 min-w-[12rem] text-sm`}
          type="submit"
        >
          Comment
        </button>
        <p
          className={`${
            title.length > 300 && '!text-red-700'
          } font-normal text-sm text-gray-700`}
        >
          {title.length}/300
        </p>
      </div>
    </form>
  );
}
