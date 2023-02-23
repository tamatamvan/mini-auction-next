import { type NextPage } from 'next';
import Head from 'next/head';

import Navbar from '~/modules/Navbar';
import ItemsList from '~/modules/ItemsList';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>💸 MAX - Mini Auction Next 💸</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen">
        <Navbar />
        <div className="container mx-auto flex flex-col px-2 pt-4">
          <ItemsList />
        </div>
      </main>
    </>
  );
};

export default Home;
