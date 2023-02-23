import { type NextPage } from 'next';

import ItemsList from '~/modules/ItemsList';
import Navbar from '~/modules/Navbar';

const ItemPage: NextPage = () => {
  return (
    <>
      <Navbar />
      <ItemsList />
    </>
  );
};

export default ItemPage;
