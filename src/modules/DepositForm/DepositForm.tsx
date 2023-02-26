import { type Transaction } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { api } from '~/utils/api';

interface IDepositInput {
  amount: number;
  datetime: Date;
}

const DepositForm = () => {
  const { data: userData } = useSession();
  const apiCtx = api.useContext();

  const { data: allTrxs } = api.transactions.allTrxs.useQuery();

  const createDeposit = api.transactions.deposit.useMutation({
    async onMutate({ amount, datetime }) {
      //  optimistic scenario
      await apiCtx.transactions.allTrxs.cancel();
      const trxs = apiCtx.transactions.allTrxs.getData() ?? [];
      const newDepositTmp = {
        amount,
        id: new Date(datetime).getTime().toString(), // temporary id
        datetime: new Date(datetime),
        userId: userData?.user.id,
        trxType: 'DEPOSIT',
        trxStatus: 'COMPLETED',
        auctionId: '',
      } as Transaction;

      apiCtx.transactions.allTrxs.setData(undefined, [...trxs, newDepositTmp]);
    },
    // onSuccess(trx, { datetime }) {

    // },
  });

  const { register, handleSubmit } = useForm<IDepositInput>();
  const onSubmit: SubmitHandler<IDepositInput> = (depositData) =>
    createDeposit.mutate({
      ...depositData,
      datetime: new Date().toString(),
    });

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="number"
          id="deposit-amount"
          placeholder="Input you deposit amount (USD)"
          {...register('amount', { valueAsNumber: true })}
        />

        <button type="submit">Deposit Now</button>
      </form>
    </>
  );
};

export default DepositForm;
