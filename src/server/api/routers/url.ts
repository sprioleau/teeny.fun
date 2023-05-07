import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { PROJECT_REPO_URL } from "@/constants/projectRepoUrl";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "@/server/api/trpc";
import { emojiToCodePoints, generateShortCode } from "@/utils";

import fetchMeta from "@/utils/fetchMetadata";

export const urlRouter = createTRPCRouter({
	// getAll: publicProcedure.query(({ ctx }) => {
	// 	return ctx.prisma.url.findMany({
	// 		include: {
	// 			metadata: true,
	// 		},
	// 	});
	// }),

	getPublicUrlsByCode: publicProcedure
		.input(
			z.object({
				combinedCodePoints: z.string(),
			})
		)
		.query(({ ctx, input }) => {
			const codePointList = input.combinedCodePoints.split(":");

			return ctx.prisma.url.findMany({
				where: {
					AND: [
						{ codePoints: { in: codePointList } },
						{
							userId: null,
						},
					],
				},
				include: {
					metadata: true,
				},
			});
		}),

	getByUserId: protectedProcedure.query(({ ctx }) => {
		return ctx.prisma.url.findMany({
			where: { userId: ctx.session.user.id },
			include: {
				metadata: true,
			},
		});
	}),

	getProjectRepoUrl: publicProcedure.query(({ ctx }) => {
		return ctx.prisma.url.findFirstOrThrow({
			where: { destinationUrl: PROJECT_REPO_URL },
			include: { metadata: true },
		});
	}),

	create: publicProcedure
		.input(
			z.object({
				destinationUrl: z.string(),
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

			const metadata = await fetchMeta(input.destinationUrl);

			const newMetadata = await ctx.prisma.metadata.create({
				data: metadata,
			});

			const newUrl = await ctx.prisma.url.create({
				data: {
					destinationUrl: input.destinationUrl,
					code,
					codePoints,
					userId: ctx.session?.user.id,
					metadataId: newMetadata.id,
				},
			});

			if (!newUrl) {
				throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Failed to create URL" });
			}

			return newUrl;
		}),

	deleteById: protectedProcedure
		.input(
			z.object({
				id: z.string(),
			})
		)
		.mutation(async ({ input, ctx }) => {
			const deletedUrl = await ctx.prisma.url.delete({
				where: {
					id: input.id,
				},
			});

			if (!deletedUrl) {
				throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Failed to delete URL" });
			}

			return deletedUrl;
		}),
});
