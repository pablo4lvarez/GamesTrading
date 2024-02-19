// pages/_app.js or pages/_app.tsx
// pages/_app.js or pages/_app.tsx

// pages/_app.tsx

import { AppProps } from 'next/app';
import { SessionProvider, getSession } from 'next-auth/react';
// import RootLayout from '@/app/layout';

function MyApp({ Component, pageProps, session }: AppProps) {
  return (
    <SessionProvider session={session}>
      
        <Component {...pageProps} />
      
    </SessionProvider>
  );
}

export default MyApp;






