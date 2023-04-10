import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { emojiToCodePoints, generateShortCode } from "~/utils";

export const urlRouter = createTRPCRouter({
	getAll: publicProcedure.query(({ ctx }) => {
		return ctx.prisma.url.findMany();
	}),

	getByUserId: protectedProcedure.query(({ ctx }) => {
		return ctx.prisma.url.findMany({ where: { userId: ctx.session.user.id } });
	}),

	create: publicProcedure
		.input(
			z.object({
				longUrl: z.string(),
			})
		)
		.mutation(async ({ input, ctx }) => {
			const code = generateShortCode();
			const codePoints = emojiToCodePoints(code);

			const existingUrl = await ctx.prisma.url.findUnique({
				where: {
					codePoints,
				},
			});

			if (existingUrl) {
				throw new TRPCError({
					code: "CONFLICT",
					message: "Code already exists",
				});
			}

			const newUrl = await ctx.prisma.url.create({
				data: {
					longUrl: input.longUrl,
					code,
					codePoints,
					userId: ctx.session?.user.id,
				},
			});

			if (!newUrl) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Failed to create URL" });

			return newUrl;
		}),
});
