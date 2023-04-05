import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { emojiToCodePoints } from "~/utils";

export const urlRouter = createTRPCRouter({
	getAll: publicProcedure.query(({ ctx }) => {
		return ctx.prisma.url.findMany();
	}),

	getByUserId: protectedProcedure.query(({ ctx }) => {
		return ctx.prisma.url.findMany({ where: { userId: ctx.session.user.id } });
	}),

	create: protectedProcedure
		.input(
			z.object({
				longUrl: z.string(),
				code: z.string().emoji(),
				codeStyle: z.enum(["EMOJI", "ALPHANUMERIC"]),
			})
		)
		.mutation(async ({ input, ctx }) => {
			const codePoints = emojiToCodePoints(input.code);

			const existingUrl = await ctx.prisma.url.findUnique({
				where: {
					codePoints,
				},
			});

			if (existingUrl) {
				console.log("🚀 ~ file: url.ts:24 ~ .mutation ~ existingUrl:", existingUrl);
				throw new TRPCError({
					code: "CONFLICT",
					message: "Code already exists",
				});
			}

			const newUrl = await ctx.prisma.url.create({
				data: {
					longUrl: input.longUrl,
					code: input.code,
					codePoints,
					codeStyle: input.codeStyle,
					userId: ctx.session.user.id,
				},
			});

			if (!newUrl) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Failed to create URL" });

			return newUrl;
		}),
});
