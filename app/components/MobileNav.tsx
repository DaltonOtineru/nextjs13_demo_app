'use client';

import { useRecoilState } from 'recoil';
import { mobileMenuState } from '../atoms/mobileMenuAtom';
import NavLink from './NavLink';

export default function MobileNav() {
  const [mobileMenu, setmobileMenu] = useRecoilState<boolean>(mobileMenuState);

  const closeMobileMenu = () => {
    return setmobileMenu(false);
  };
  return (
    <div
      className={`${
        mobileMenu ? 'flex' : 'hidden'
      }  absolute -bottom-26 right-0 left-0 z-50 flex-col px-6 bg-black py-4 overflow-hidden`}
    >
      <ul className="space-y-4 flex flex-col">
        <NavLink
          path="/"
          linkSegment="(home)"
          text="Home"
          closeMenu={closeMobileMenu}
        />
        <NavLink
          path="/posts"
          linkSegment="posts"
          text="Feed"
          closeMenu={closeMobileMenu}
        />
        <NavLink
          path="/subscribe"
          linkSegment="subscribe"
          text="Subscribe"
          closeMenu={closeMobileMenu}
        />
      </ul>
    </div>
  );
}
