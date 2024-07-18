/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { Inter } from 'next/font/google';
import '../styles.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Chronicle',
  description: 'Blazin fast',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
