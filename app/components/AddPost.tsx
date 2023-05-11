'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';

import { useSession } from 'next-auth/react';
import Dots from './Icons/Dots';
import { error } from 'console';

export default function AddPost() {
  const { data: session } = useSession();
  const { user } = session || {};

  const [title, setTitle] = useState<string>('');
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [outline, setOutline] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(
    async (title: string) => await axios.post('/api/posts/addPost', { title }),
    {
      onError: (error) => {
        if (error instanceof AxiosError) {
          setIsDisabled(false);
          setIsError(true);
          setErrorMessage(error?.response?.data.message);
          setTimeout(() => {
            setIsError(false);
          }, 3000);
        }
      },

      onSuccess: (data) => {
        setTitle('');
        queryClient.invalidateQueries(['posts']);
        setTimeout(() => {
          setIsDisabled(false);
        }, 2000);
      },
    }
  );

  const submitPost = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();
    setIsDisabled(true);
    mutate(title);
  };

  console.log(isError);
  console.log(errorMessage);

  return (
    <form onSubmit={submitPost}>
      <div className="flex flex-col my-4 rounded-md relative">
        {/* {!user && <h3>Please sign in to post</h3>} */}
        <textarea
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setTitle(e.target.value)
          }
          name="title"
          value={title}
          onMouseEnter={() => setOutline(true)}
          onMouseLeave={() => setOutline(false)}
          onFocus={() => setIsError(false)}
          placeholder="What's on your mind?"
          className={`text-[#ecedee] bg-black p-4 text-lg rounded-xl mt-2 border-2 border-[#ecedee]/30 placeholder:text-[#ecedee]/40 caret-[#ecedee] focus:outline-none resize-none focus:border-white transition-all duration-300 ease ${
            outline && '!border-white'
          }`}
        />
      </div>
      <div className="space-y-2 flex items-center justify-between -mt-2 relative">
        <button
          disabled={isDisabled}
          className={`bg-blue-600 text-white py-3 px-6 rounded-xl text-sm disabled:bg-opacity-50 min-w-[12rem] h-[46px] ${
            !user && 'bg-[#ECEEF0] text-[#7E868C] cursor-default'
          }`}
          type="submit"
        >
          {isDisabled ? <Dots /> : 'Post'}
        </button>
        <p
          className={`${
            title.length > 300 && '!text-red-700'
          }  text-sm text-[#ecedee]`}
        >
          {title.length}/300
        </p>
        {isError && (
          <div className="absolute -bottom-3 left-[35%] rounded-xl bg-[#16181A] text-[#ecedee] p-6">
            <span> {errorMessage} </span>
          </div>
        )}
      </div>
    </form>
  );
}
