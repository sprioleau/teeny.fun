import { type NextApiRequest, type NextApiResponse } from "next";
import { PROJECT_REPO_URL } from "~/constants/projectRepoUrl";
import { prisma } from "~/server/db";

/*
 * See verce.json for schedule:
 * Runs at 1:00PM UTC (9:00AM EST)
 */

const MINUTES_UNTIL_RESET = 60 * 24; // 1 day
const MILLISECONDS_PER_MINUTE = 1000 * 60; // Represents 1 minute in milliseconds

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
	const millisecondsToExpire = MILLISECONDS_PER_MINUTE * MINUTES_UNTIL_RESET;
	const dateExpired = new Date(Date.now() - millisecondsToExpire).toISOString();

	const urlsToDelete = await prisma.url.deleteMany({
		where: {
			AND: [
				{ userId: null },
				{
					createdAt: {
						lte: dateExpired,
					},
				},
			],
			NOT: [
				{
					destinationUrl: PROJECT_REPO_URL,
				},
			],
		},
	});

	response.status(200).json({
		ok: true,
		urlsToDelete,
	});
}
