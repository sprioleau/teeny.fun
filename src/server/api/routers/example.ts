import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "~/server/api/trpc";

export const exampleRouter = createTRPCRouter({
	hello: publicProcedure.input(z.object({ text: z.string() })).query(async ({ input, ctx }) => {
		const data = await ctx.prisma.example.findMany();

		return {
			greeting: `Hello ${input.text}`,
			data,
		};
	}),

	getAll: publicProcedure.query(({ ctx }) => {
		return ctx.prisma.example.findMany();
	}),

	getSecretMessage: protectedProcedure.query(() => {
		return "you can now see this secret message!";
	}),
});
