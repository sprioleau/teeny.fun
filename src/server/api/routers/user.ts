import { createTRPCRouter } from "@/server/api/trpc";

export const userRouter = createTRPCRouter({
	// TODO: Allow user to delete account from DB
	// getAll: publicProcedure.query(({ ctx }) => {
	// 	return ctx.prisma.user.findMany();
	// }),
});
