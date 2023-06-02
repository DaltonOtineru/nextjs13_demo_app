'use client';

import { useRecoilState } from 'recoil';
import { mobileMenuState } from '../atoms/mobileMenuAtom';

export default function MobileBackdrop() {
  const [mobileMenu, setmobileMenu] = useRecoilState<boolean>(mobileMenuState);

  return (
    <>
      {mobileMenu && (
        <div
          className={`z-20 md:hidden h-screen fixed top-0 bottom-0 left-0 right-0 bg-black/30 backdrop-blur-sm`}
          onClick={() => setmobileMenu(false)}
        />
      )}
    </>
  );
}
