import Link from 'next/link';
import Login from './Login';
import Logged from './Logged';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../pages/api/auth/[...nextauth]';
import NavLinks from './NavLinks';
import { cardDetails } from '../(home)/CardDetails';

export default async function Nav() {
  const session = await getServerSession(authOptions);

  const icon = cardDetails[0].svg;

  return (
    <nav className="w-full shadow-lg">
      <div className="flex justify-between items-center py-4 w-full max-w-[1300px] mx-auto px-6 ">
        <Link href={'/'} className="flex items-center gap-x-2">
          {icon}
          <h1 className="text-xl text-[#ecedee] hidden md:inline">
            Next.js 13 Demo App
          </h1>
        </Link>
        <NavLinks />
        <ul className="items-center flex gap-6">
          {!session?.user && <Login />}
          {session?.user && <Logged image={session.user.image || ''} />}
        </ul>
      </div>
    </nav>
  );
}
