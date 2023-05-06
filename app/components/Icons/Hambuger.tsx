'use client';

import { mobileMenuState } from '@/app/atoms/mobileMenuAtom';
import { useRecoilState } from 'recoil';

const HamburgerIcon = () => {
  const [mobileMenu, setMobileMenu] = useRecoilState<boolean>(mobileMenuState);

  const hamburgerLine = `h-1 w-8 my-1 rounded-full bg-[#ecedee] transition ease transform duration-500`;

  return (
    <button
      className={`flex mr-1 md:hidden flex-col h-10 w-10 rounded justify-center items-center group z-20`}
      onClick={() => setMobileMenu(!mobileMenu)}
    >
      <div
        className={`${hamburgerLine} ${
          mobileMenu && 'rotate-45 translate-y-3 '
        }`}
      />
      <div className={`${hamburgerLine} ${mobileMenu ? 'opacity-0' : ''}`} />
      <div
        className={`${hamburgerLine} ${
          mobileMenu && '-rotate-45 -translate-y-3 '
        }`}
      />
    </button>
  );
};

export default HamburgerIcon;
