import Link from 'next/link';
import Login from './Login';
import Logged from './Logged';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../pages/api/auth/[...nextauth]';

import { cardDetails } from '../(home)/CardDetails';
import NavLink from './NavLink';
import { useSession } from 'next-auth/react';
import HamburgerIcon from './Icons/Hambuger';
import MobileNav from './MobileNav';
import MobileBackdrop from './MobileBackdrop';

export default async function Nav() {
  const session = await getServerSession(authOptions);

  const icon = cardDetails[0].svg;

  return (
    <header className="sticky top-0 overscroll-none">
      <nav className="w-full z-30 shadow-lg sticky top-8 left-0 right-0 bg-black/30 backdrop-blur-[10px]">
        <div className="flex justify-between items-center py-4 w-full max-w-[1300px] mx-auto px-6 ">
          <div className="flex">
            <HamburgerIcon />
            <Link href={'/'} className="flex items-center gap-x-2">
              {icon}
              <h1 className="text-xl text-[#ecedee] hidden md:inline">
                Next.js 13 Demo App
              </h1>
            </Link>
          </div>

          <ul className="space-x-4 hidden md:flex">
            <NavLink path="/" linkSegment="(home)" text="Home" />
            <NavLink path="/posts" linkSegment="posts" text="Feed" />
            <NavLink
              path="/subscribe"
              linkSegment="subscribe"
              text="Subscribe"
            />
          </ul>
          <ul className="items-center flex gap-6">
            {!session?.user && <Login />}
            {session?.user && <Logged image={session?.user.image || ''} />}
          </ul>
        </div>
      </nav>
      <MobileBackdrop />
      <MobileNav />
    </header>
  );
}
