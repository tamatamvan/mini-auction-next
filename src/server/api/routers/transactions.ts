import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc';

const TRX_TYPES = ['DEPOSIT', 'BID', 'REFUND'] as const;
const TRX_STATUS = ['PENDING', 'REJECTED', 'COMPLETED'] as const;

const depositObj = z.object({
  amount: z.number().positive(),
  trxType: z.enum(TRX_TYPES),
  trxStatus: z.enum(TRX_STATUS),
});

export const transactionsRouter = createTRPCRouter({
  deposit: protectedProcedure.input(depositObj).mutation(({ input, ctx }) => {
    return { ...input, datetime: new Date(), userId: ctx.session.user.id };
  }),
});
