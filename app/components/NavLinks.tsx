'use client';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';

export default function NavLinks() {
  const segment = useSelectedLayoutSegment();
  return (
    <ul className="space-x-4">
      <Link
        href="/"
        className={`${
          segment === '(home)' ? 'text-blue-600 font-bold' : 'text-[#ecedee]'
        }`}
      >
        Home
      </Link>
      <Link
        href="/posts"
        className={`${
          segment === 'posts' ? 'text-blue-600 font-bold' : 'text-[#ecedee]'
        }`}
      >
        Feed
      </Link>
      <Link
        href="/subscribe"
        className={`${
          segment === 'subscribe' ? 'text-blue-600 font-bold' : 'text-[#ecedee]'
        }`}
      >
        Subscribe
      </Link>
    </ul>
  );
}
