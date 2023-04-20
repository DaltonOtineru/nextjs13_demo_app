'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';

type PostProps = {
  id?: string;
};

export default function AddComment({ id }: PostProps) {
  const [title, setTitle] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);

  const queryClient = useQueryClient();

  const { mutate } = useMutation(async (data) =>
    axios.post('/api/posts/addComment', title)
  );

  return (
    <form className="my-8">
      <h3>Add a comment</h3>
      <div className="flex flex-col my-2">
        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          type="text"
          name="title"
          className="p-4 text-lg rounded-md my-2"
        />
      </div>
      <div className="gap-2 flex items-center">
        <button
          disabled={isDisabled}
          className="text-md bg-teal-600 text-white py-2 px-6 rounded-xl font-semibold disabled:opacity-25 "
          type="submit"
        >
          Add Comment 🚀
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
