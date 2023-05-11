'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';

import { useSession } from 'next-auth/react';
import Dots from './Icons/Dots';

type PostProps = {
  id?: string;
};

export default function AddComment({ id }: PostProps) {
  const { data: session } = useSession();
  const { user } = session || {};

  const [title, setTitle] = useState<string>('');
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [outline, setOutline] = useState<boolean>(false);
  const [focus, setFocus] = useState<boolean>(false);

  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    async (title: string) =>
      await axios.post('/api/posts/addComment', { title, id }),
    {
      onError: (error) => {
        if (error instanceof AxiosError) {
          console.log('ERROR COMMENT', error);
          setIsDisabled(false);
          setIsError(true);
          setErrorMessage(error?.response?.data.message);
          setTimeout(() => {
            setIsError(false);
          }, 3000);
        }
      },
      onSuccess: ({ data }) => {
        setTitle('');
        queryClient.invalidateQueries(['comments']);
        queryClient.invalidateQueries(['detail-post']);
        setTimeout(() => {
          setIsDisabled(false);
        }, 2000);
      },
    }
  );

  const submitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsDisabled(true);
    mutate(title);
  };

  return (
    <form className="my-8" onSubmit={submitComment}>
      <div className="flex flex-col my-2 h-32">
        <textarea
          onChange={(e) => setTitle(e.target.value)}
          onMouseEnter={() => setOutline(true)}
          onMouseLeave={() => setOutline(false)}
          onFocus={() => {
            setFocus(true);
            setIsError(false);
          }}
          onBlur={() => setFocus(false)}
          value={title}
          name="title"
          role="textbox"
          placeholder={`Comment here...`}
          contentEditable
          className={`text-[#ecedee] bg-black px-3 py-2 h-full text-lg rounded-xl my-2 focus:outline-none border-2 border-[#ecedee]/30 resize-none transition-all duration-300 ease  placeholder:text-[#ecedee]/40 caret-[#ecedee]  ${
            (outline || focus) && '!border-white'
          } `}
        />
      </div>
      <div className="gap-2 flex items-center justify-between relative">
        <button
          disabled={isDisabled}
          className={`text-md bg-blue-600 text-white py-3 px-6 rounded-xl disabled:bg-opacity-50 min-w-[12rem] text-sm min-h-[46px]`}
          type="submit"
        >
          {isDisabled ? <Dots /> : 'Comment'}
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
