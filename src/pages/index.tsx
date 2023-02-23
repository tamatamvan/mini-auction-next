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

      <ItemsList />
    </>
  );
};

export default Home;
