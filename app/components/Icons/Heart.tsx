'use client';

import { useState } from 'react';

export const HeartIcon = ({
  fill,
  onClick,
}: {
  fill: boolean;
  onClick: Function;
}) => {
  const [hover, setHover] = useState(false);
  return (
    <svg
      style={{ cursor: 'pointer' }}
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill={fill ? '#F31260' : 'none'}
      xmlns="http://www.w3.org/2000/svg"
      onClick={() => onClick()}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <path
        d="M12.62 20.81c-.34.12-.9.12-1.24 0C8.48 19.82 2 15.69 2 8.69 2 5.6 4.49 3.1 7.56 3.1c1.82 0 3.43.88 4.44 2.24a5.53 5.53 0 0 1 4.44-2.24C19.51 3.1 22 5.6 22 8.69c0 7-6.48 11.13-9.38 12.12Z"
        stroke={fill || hover ? '#F31260' : '#9ba1a6'}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
