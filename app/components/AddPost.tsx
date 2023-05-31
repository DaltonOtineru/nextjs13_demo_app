'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useSession } from 'next-auth/react';
import Dots from './Icons/Dots';
import { useRecoilValue } from 'recoil';
import { mobileMenuState } from '../atoms/mobileMenuAtom';
import openai from '@/lib/openai';

export default function AddPost() {
  const { data: session } = useSession();
  const { user } = session || {};

  const [title, setTitle] = useState<string>('');
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [outline, setOutline] = useState<boolean>(false);
  const [enhancing, setEnhancing] = useState<boolean>(false);
  const [enhanceError, setEnhanceError] = useState<boolean>(false);

  const mobileMenuOpen = useRecoilValue<boolean>(mobileMenuState);

  const queryClient = useQueryClient();

  const { mutate: handlePost } = useMutation(
    async (title: string) => await axios.post('/api/posts/addPost', { title }),
    {
      onError: (error) => {
        if (error instanceof AxiosError) {
          setIsDisabled(false);
          setIsError(true);
          setErrorMessage(error?.response?.data.message);
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
    e.preventDefault();
    setIsDisabled(true);
    handlePost(title);
  };

  const enhanceWithAI = async () => {
    if (enhancing) return;
    if (title.length < 1) {
      setEnhanceError(true);
      return;
    }
    setEnhancing(true);
    setEnhanceError(false);
    const res = await axios.post('/api/enhanceMessage', {
      prompt: title,
    });
    console.log(res, 'RES-1');
    if (res.status === 200) {
      const GPTdata = res || {};
      console.log(res, 'RES');
      setTitle(GPTdata.data.content);
    } else {
      setEnhanceError(true);
    }
    setEnhancing(false);
  };

  return (
    <form onSubmit={submitPost}>
      <div
        className={`flex flex-col my-4 rounded-md relative ${
          mobileMenuOpen && '-z-10'
        }`}
      >
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
      <div className={`space-y-2 flex items-center justify-between -mt-2`}>
        <div className="space-x-2 flex">
          <button
            disabled={isDisabled}
            className={`bg-blue-600 text-white py-3 px-6 rounded-xl text-sm disabled:bg-opacity-50 min-w-[10rem] h-[46px] ${
              !user && 'cursor-default'
            }`}
            type="submit"
          >
            {isDisabled ? <Dots /> : 'Post'}
          </button>
          <div
            className={`bg-purple-600 text-white py-3 px-6 rounded-xl text-sm disabled:bg-opacity-50 min-w-[10rem] h-[46px] cursor-pointer ${
              !user && 'cursor-default'
            }`}
            onClick={enhanceWithAI}
          >
            Enhance with AI
          </div>
        </div>

        <p
          className={`${
            title.length > 300 && '!text-red-700'
          }  text-sm text-[#ecedee]`}
        >
          {title.length}/300
        </p>
      </div>
      {isError && (
        <span className="text-sm text-red-600 pt-2 pl-1">{errorMessage}</span>
      )}
    </form>
  );
}
