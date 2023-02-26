import { type NextPage } from 'next';

import PageHeading from '~/components/PageHeading';
import DepositForm from '~/modules/DepositForm';

import { api } from '~/utils/api';

const ProfilePage: NextPage = () => {
  // const { data: userData } = useSession();
  const { data: allTrxs } = api.transactions.allTrxs.useQuery();

  console.log(allTrxs);
  return (
    <>
      <PageHeading>Profile</PageHeading>
      <DepositForm />
      <ul>
        {allTrxs?.map((trx) => (
          <li key={trx.id}>{trx.id}</li>
        ))}
      </ul>
    </>
  );
};

export default ProfilePage;
