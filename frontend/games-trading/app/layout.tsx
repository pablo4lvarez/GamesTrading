'use client';


import { Inter } from 'next/font/google';
import './globals.css';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { SessionProvider, getSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
  session, // You need to receive the session as a prop
}: {
  children: React.ReactNode;
  session: any; // Update the type based on the actual session type
}) {

  return (
    <html lang="en" data-theme="dark">
      <body>
        <SessionProvider session={session}>
          <NavBar />
          <main className="relative overflow-hidden">{children}</main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
