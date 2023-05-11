'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';
import { SessionProvider } from 'next-auth/react';
import { RecoilRoot } from 'recoil';

interface Props {
  children: ReactNode;
}

const ProviderWrapper = ({ children }: Props) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <Toaster />
          {children}
        </RecoilRoot>
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default ProviderWrapper;
