import Link from 'next/link';
import Login from './Login';
import Logged from './Logged';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../pages/api/auth/[...nextauth]';

export default async function Nav() {
  const session = await getServerSession(authOptions);

  return (
    <nav className="w-full shadow-lg">
      <div className="flex justify-between items-center py-4 w-full max-w-[1300px] mx-auto px-6 sm:px-0">
        <Link href={'/'}>
          <h1 className="font-bold text-2xl">poster.</h1>
        </Link>
        <ul className="items-center flex gap-6">
          {!session?.user && <Login />}
          {session?.user && <Logged image={session.user.image || ''} />}
        </ul>
      </div>
    </nav>
  );
}
