'use client';

import Image from 'next/image';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { FaCrown } from 'react-icons/fa';

type User = {
  image: string;
};

export default function Logged({ image }: User) {
  const { data: session } = useSession();
  const { user } = session || {};

  return (
    <li className="flex gap-4 items-center">
      <Link href={'/subscribe'}>
        <div className="relative">
          <Image
            width={40}
            height={40}
            src={image}
            alt="User Avatar"
            priority
            className="rounded-full shadow-lg"
          />
          {user?.subscriptionStatus === 'active' && (
            <div className="absolute -top-3 -right-4 px-2 py-2 flex items-center justify-center bg-blue-600 rounded-full">
              <span className="text-white text-xs m-auto font-bold">
                <FaCrown className="w-4" />
              </span>
            </div>
          )}
        </div>
      </Link>
      <button
        onClick={() => signOut()}
        className={`text-lg rounded-lg text-[#ecedee] ml-4 ${
          user?.subscriptionStatus === 'active' && 'ml-4'
        }`}
      >
        Sign Out
      </button>
    </li>
  );
}
