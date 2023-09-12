'use client';

import Image from 'next/image';

export default function Avatar() {
  return (
    <div className="flex gap-x-4 items-center mt-4">
      <Image
        src="/avatar.jpeg"
        alt="avatar"
        height={40}
        width={40}
        className="w-12 h-12 rounded-full"
      />
      <div className="flex-col gap-y-1 leading-tight">
        <p className="text-[#ecedee]">Dalton Otineru</p>
        <a
          href="https://github.com/daltonotineru"
          target="_blank"
          className="text-[#0072F5]"
        >
          github.com/daltonotineru
        </a>
      </div>
    </div>
  );
}
