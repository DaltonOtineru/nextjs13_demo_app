'use client';

import Image from 'next/image';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

type User = {
  image: string;
};

export default function Logged({ image }: User) {
  return (
    <li className="flex gap-4 items-center">
      <Link href={'/'}>
        <Image
          width={40}
          height={40}
          src={image}
          alt="User Avatar"
          priority
          className="rounded-full shadow-lg"
        />
      </Link>
      <button
        onClick={() => signOut()}
        className="text-lg rounded-lg text-[#ecedee]"
      >
        Sign Out
      </button>
    </li>
  );
}
