'use client';

import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import { motion } from 'framer-motion';

type Props = {
  path: string;
  linkSegment: string;
  text: string;
  closeMenu?: () => void;
  time?: string;
};

export default function NavLink({
  path,
  linkSegment,
  text,
  closeMenu,
  time,
}: Props) {
  const segment = useSelectedLayoutSegment();

  return (
    <Link
      href={path}
      onClick={closeMenu}
      className={`${
        segment === linkSegment ? 'text-blue-600 font-bold' : 'text-[#ecedee]'
      }`}
    >
      {time ? (
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: time }}
          className="text-lg"
        >
          {text}
        </motion.div>
      ) : (
        text
      )}
    </Link>
  );
}
