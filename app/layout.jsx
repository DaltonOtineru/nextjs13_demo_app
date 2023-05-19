import './css/globals.css';
import Nav from './components/Nav';
import { Roboto } from 'next/font/google';
import ProviderWrapper from './ProviderWrapper';

export const metadata = {
  title: 'Next.js 13 Demo App',
  description: 'Created by Dalton Otineru',
  keywords: [
    'Next.js',
    'React',
    'TypeScript',
    'Server Components',
    'NextAuth',
    'Prisma',
    'PostgreSQL',
    'Stripe',
  ],
  authors: [
    {
      name: 'Dalton Otineru',
      url: 'https://github.com/daltonotineru',
    },
  ],
  creator: 'Dalton Otineru',
  publisher: 'Dalton Otineru',
};

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-roboto',
});

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} font-sans bg-black`}>
        <ProviderWrapper>
          <Nav />
          {children}
        </ProviderWrapper>
      </body>
    </html>
  );
}
