'use client';

import { GrClose } from 'react-icons/gr';

type ToggleProps = {
  deleteFunction: () => void;
  setToggle: (toggle: boolean) => void;
  text: string;
};

export default function Toggle({
  deleteFunction,
  setToggle,
  text,
}: ToggleProps) {
  return (
    <div
      className="fixed bg-black/70 w-full h-full z-20 left-0 top-0 transition-all ease duration-4000"
      onClick={() => setToggle(false)}
    >
      <div
        className="position absolute bg-[#16181A] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 py-4 px-6 rounded-xl flex flex-col gap-6 justify-center transition-all ease duration-500"
        onClick={(e) => e.stopPropagation()}
      >
        <GrClose
          className="ml-auto text-lg cursor-pointer close__icon"
          onClick={() => setToggle(false)}
          style={{ stroke: 'white' }}
        />
        <p className="text-[#ecedee]">{`Are you sure you want to delete this ${text}?`}</p>
        <div className="flex justify-end gap-x-2">
          <button className="bg-blue-600 text-white py-3 px-4 rounded-xl text-sm">
            Cancel
          </button>
          <button
            className="bg-red-600 text-sm text-white py-3 px-4 rounded-xl"
            onClick={deleteFunction}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
