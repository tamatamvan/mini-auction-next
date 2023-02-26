import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc';

const depositObj = z.object({
  amount: z.number().positive(),
  datetime: z.string().datetime(),
});

export const transactionsRouter = createTRPCRouter({
  allTrxs: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.transaction.findMany({
      where: {
        userId: { equals: ctx.session.user.id },
      },
    });
  }),
  deposit: protectedProcedure.input(depositObj).mutation(({ input, ctx }) => {
    const newTrx = ctx.prisma.transaction.create({
      data: {
        ...input,
        datetime: new Date(),
        userId: ctx.session.user.id,
        trxType: 'DEPOSIT',
        trxStatus: 'COMPLETED',
      },
    });

    return newTrx;
  }),
});
