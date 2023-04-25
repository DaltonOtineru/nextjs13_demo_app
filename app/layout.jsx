import './css/globals.css';
import Nav from './components/Nav';
import { Roboto } from 'next/font/google';
import QueryWrapper from './QueryWrapper';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-roboto',
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} font-sans`}>
        <QueryWrapper>
          <Nav />

          {children}
        </QueryWrapper>
      </body>
    </html>
  );
}
