import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { redirect } from 'next/navigation';
import MyPosts from './MyPosts';

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/api/auth/signin');
  }

  return (
    <main className="w-full flex flex-col items-center px-6 sm:px-0 py-4">
      <div className="max-w-xl w-full">
        <h1 className="text-2xl font-bold">
          Welcome Back {session?.user?.name}!
        </h1>
        <MyPosts />
      </div>
    </main>
  );
}
