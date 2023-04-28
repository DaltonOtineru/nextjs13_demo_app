'use client';

import { GrClose } from 'react-icons/gr';

type ToggleProps = {
  deletePost: () => void;
  setToggle: (toggle: boolean) => void;
};

export default function Toggle({ deletePost, setToggle }: ToggleProps) {
  return (
    <div
      className="fixed bg-black/50 w-full h-full z-20 left-0 top-0 transition-all ease duration-500"
      onClick={(e) => setToggle(false)}
    >
      <div className="position absolute bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 py-4 px-6 rounded-xl flex flex-col gap-6 justify-center transition-all ease duration-500">
        <GrClose className="ml-auto text-lg cursor-pointer" />
        <p>Are you sure you want to delete this post?</p>
        <div className="flex justify-end gap-x-2">
          <button className="bg-[#cee4fe] text-blue-600 py-3 px-4 rounded-xl text-sm">
            Cancel
          </button>
          <button
            className="bg-red-600 text-sm text-white py-3 px-4 rounded-xl"
            onClick={deletePost}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
