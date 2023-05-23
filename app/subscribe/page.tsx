'use client';

import Image from 'next/image';
import { useRecoilValue } from 'recoil';
import { mobileMenuState } from '../atoms/mobileMenuAtom';
import { useSession } from 'next-auth/react';

export default function Subscribe() {
  const mobileMenuOpen = useRecoilValue<boolean>(mobileMenuState);

  const { data: session } = useSession();
  const { user } = session || {};

  const subStatus = user ? user.subscriptionStatus == 'active' : false;

  const disableForm = !user || (user && subStatus) ? true : false;

  return (
    <main
      className={`max-w-[1300px] mx-auto py-6 px-6 ${
        mobileMenuOpen && 'z-[-1]'
      } relative`}
    >
      <h1 className="font-bold text-transparent text-6xl bg-clip-text bg-gradient-to-tr from-[#F31260] from-20% to-[#F5A524] to-70% w-fit mt-2 mb-6">
        Subscribe
      </h1>
      <div className="w-full h-[400px] shadow-xl relative rounded-2xl ">
        <Image
          src="https://images.pexels.com/photos/3975590/pexels-photo-3975590.jpeg"
          className="w-full h-[400px] object-cover rounded-2xl"
          priority
          alt="Subscribe"
          width={1300}
          height={400}
        />
        <div className="absolute top-0 left-0 right-0 w-full flex flex-col items-start p-4">
          <span className="text-sm text-[#e8e8e7] mb-1">PRO PLAN</span>
          <span className="text-2xl font-semibold text-white">
            Get unlimited posts and comments
          </span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 flex space-between px-4 py-4 bg-[rgb(15_17_20)] bg-opacity-40 subscribe rounded-b-2xl backdrop-blur-[10px]">
          <div className="flex flex-col justify-center w-full text-xs text-[#d1d1d1] gap-y-1">
            <span>Available now</span>
            <span>Use Card 4242 4242 4242 4242 to test</span>
          </div>
          <form action="/api/stripe" method="POST" className="min-w-fit">
            <button
              className="bg-[rgb(148_249_240)] bg-opacity-[.15] text-[#90EBE1] min-w-fit rounded-full px-5 py-3 cursor-pointer text-xs font-semibold flex items-center justify-center"
              disabled={disableForm}
            >
              {session && !subStatus && 'Subscribe Now'}
              {session && subStatus && 'You are already subscribed'}
              {!session && 'Sign in to Subscribe'}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
