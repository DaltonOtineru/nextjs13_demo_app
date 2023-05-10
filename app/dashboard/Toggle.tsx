'use client';

import { GrClose } from 'react-icons/gr';
import { motion } from 'framer-motion';
import Dots from '../components/Icons/Dots';

type ToggleProps = {
  deleteFunction: () => void;
  setToggle: (toggle: boolean) => void;
  text: string;
  deleting: boolean;
};

export default function Toggle({
  deleteFunction,
  setToggle,
  text,
  deleting,
}: ToggleProps) {
  return (
    <motion.div
      className="fixed bg-black/70 w-full h-full z-20 left-0 top-0 transition-all ease duration-4000 backdrop-blur-sm"
      onClick={() => setToggle(false)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
    >
      <div
        className="position absolute bg-[#16181A] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 py-4 px-6 rounded-xl flex flex-col gap-6 justify-center transition-all ease duration-500 w-10/12 max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <GrClose
          className="ml-auto text-lg cursor-pointer close__icon"
          onClick={() => setToggle(false)}
          style={{ stroke: 'white' }}
        />
        <p className="text-[#ecedee] mx-auto">{`Are you sure you want to delete this ${text}?`}</p>
        <div className="flex justify-end gap-x-2">
          <button
            className="bg-blue-600 text-white py-3 px-4 rounded-xl text-sm"
            onClick={() => setToggle(false)}
          >
            Cancel
          </button>
          <button
            className="bg-red-600 text-sm text-white py-3 px-4 rounded-xl min-w-[73px] text-center"
            onClick={deleteFunction}
          >
            {deleting ? <Dots /> : 'Delete'}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
