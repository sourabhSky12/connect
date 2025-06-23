import Navbar from '@/component/organisms/Navbar';
import './globals.css';
import { ReactNode } from 'react';
import Footer from '@/component/organisms/Footer';


export const metadata = {
  title: 'ConnectMore',
  description: 'Email marketing tool for India',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900">
        <Navbar/>
        <main>{children}</main>
        <Footer/>
      </body>
    </html>
  );
}
