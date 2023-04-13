'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export default function AddPost() {
  const [title, setTitle] = useState<string>('');
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const { mutate } = useMutation(
    async (title: string) => await axios.post('/api/posts/addPost', { title }),
    {
      onError: (error) => {
        console.log(error);
      },
      onSuccess: (data) => {
        console.log(data);
        setTitle('');
        setIsDisabled(false);
      },
    }
  );

  const submitPost = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsDisabled(true);
    mutate(title);
  };

  return (
    <form onSubmit={submitPost}>
      <div className="flex flex-col my-4 bg-white p-8 rounded-md">
        <textarea
          onChange={(e) => setTitle(e.target.value)}
          name="title"
          value={title}
          placeholder="What's on your mind?"
          className="p-4 text-lg rounded-md my-2 bg-gray-200 focus:outline-none"
        />
      </div>
      <div className="space-y-2 flex items-center justify-between">
        <p
          className={`${
            title.length > 300 && '!text-red-700'
          } font-bold text-sm text-gray-700`}
        >
          {title.length}/300
        </p>
        <button
          disabled={isDisabled}
          className="text-md bg-teal-600 text-white py-2 px-6 rounded-xl font-semibold disabled:opacity-25 "
          type="submit"
        >
          Create Post
        </button>
      </div>
    </form>
  );
}
