'use client';

import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';

type Props = {
  path: string;
  linkSegment: string;
  text: string;
  closeMenu?: () => void;
};

export default function NavLink({ path, linkSegment, text, closeMenu }: Props) {
  const segment = useSelectedLayoutSegment();

  return (
    <Link
      href={path}
      onClick={closeMenu}
      className={`${
        segment === linkSegment ? 'text-blue-600 font-bold' : 'text-[#ecedee]'
      }`}
    >
      {text}
    </Link>
  );
}
