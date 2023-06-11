import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { PROJECT_REPO } from "@/constants/projectRepoUrl";
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

	getProjectRepoUrl: publicProcedure.query(async ({ ctx }) => {
		const existingProjectRepoUrl = await ctx.prisma.url.findFirst({
			where: { destinationUrl: PROJECT_REPO.URL },
			include: { metadata: true },
		});

		if (existingProjectRepoUrl) return existingProjectRepoUrl;

		const metadata = await fetchMeta(PROJECT_REPO.URL);

		const newMetadata = await ctx.prisma.metadata.create({
			data: metadata,
		});

		const newProjectRepoUrl = await ctx.prisma.url.create({
			data: {
				destinationUrl: PROJECT_REPO.URL,
				code: PROJECT_REPO.CODE,
				codePoints: emojiToCodePoints(PROJECT_REPO.CODE),
				userId: null,
				metadataId: newMetadata.id,
			},
		});

		return newProjectRepoUrl;
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

			const newMetadata = await ctx.prisma.metadata.upsert({
				where: {
					url: input.destinationUrl,
				},
				update: metadata,
				create: metadata,
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
