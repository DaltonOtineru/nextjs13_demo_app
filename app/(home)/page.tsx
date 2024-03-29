import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import CardGrid from './CardGrid';
import Avatar from './Avatar';

export const metadata = {
  title: 'Next.js 13 Demo App',
};

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main className="max-w-[1300px] mx-auto py-6 px-6">
      <h1 className="text-[46px] sm:text-5xl font-bold tracking-tight mb-[10px] text-transparent bg-clip-text bg-gradient-to-tr from-[#0072F5] from-[-20%] to-[#FF4ECD] to-70% w-fit leading-none">
        {session?.user ? `Welcome, ${session.user.name}!` : 'Welcome!'}
      </h1>
      <h3 className="text-3xl tracking-tight mb-3 text-[#ecedee]">
        This is an app built to showcase the capabilities of Next.js 13.
      </h3>
      <a
        className="github__btnWrap "
        href="https://github.com/daltonotineru/nextjs13_demo_app"
        target="_blank"
      >
        <button className="rounded-xl text-sm px-3 py-2 text-white transition-all duration-300 ease-in-out github__btn bg-opacity-90">
          Source Code on GitHub
        </button>
      </a>
      <Avatar />
      <h3 className="text-[40px] text-[#ecedee] font-semibold my-6">
        Features
      </h3>
      {/* @ts-expect-error Server Component */}
      <CardGrid />
    </main>
  );
}
