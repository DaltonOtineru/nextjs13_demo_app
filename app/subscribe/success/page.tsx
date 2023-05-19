'use client';

import Link from 'next/link';
import { BsArrowLeft } from 'react-icons/bs';

export default function Success() {
  return (
    <main className="h-[70vh] w-screen flex flex-col items-center justify-center text-white space-y-2">
      <h1 className="text-3xl">Success!</h1>
      <h3 className="text-xl">
        You have successfully subscribed to the Pro Plan.
      </h3>
      <Link href="posts">
        <button className="text-md bg-blue-600 text-white rounded-xl py-2 px-6 disabled:opacity-75 flex gap-x-2">
          <BsArrowLeft className="text-2xl font-bold" />
          Back to Feed
        </button>
      </Link>
    </main>
  );
}
