import { type AppType } from 'next/app';
import { type Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

import { api } from '~/utils/api';

import '~/styles/globals.css';
import Navbar from '~/modules/Navbar';

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <main className="min-h-screen">
        <Navbar />
        <div className="container mx-auto flex flex-col px-2 pt-4">
          <Component {...pageProps} />
        </div>
      </main>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
