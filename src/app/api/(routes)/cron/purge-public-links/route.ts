import { PROJECT_REPO } from "@/constants";
import { db } from "@/db";
import { urls } from "@/db/schema";
import { and, eq, isNull, lte, not } from "drizzle-orm";

/*
	See verce.json for schedule:
	Runs at 1:00PM UTC (9:00AM EST)
*/

export const config = { runtime: "edge" };

const MINUTES_UNTIL_RESET = 60 * 24; // 1 day
const MILLISECONDS_PER_MINUTE = 1000 * 60; // Represents 1 minute in milliseconds

export async function GET() {
	const millisecondsToExpire = MILLISECONDS_PER_MINUTE * MINUTES_UNTIL_RESET;
	const dateExpired = new Date(Date.now() - millisecondsToExpire);

	const urlsToDelete = await db
		.delete(urls)
		.where(
			and(
				isNull(urls.userAuthProviderId),
				lte(urls.createdAt, dateExpired),
				not(eq(urls.destinationUrl, PROJECT_REPO.URL))
			)
		);
	console.log("🚀 ~ GET ~ urlsToDelete:", urlsToDelete);

	return Response.json(
		{
			ok: true,
			urlsToDelete,
		},
		{
			status: 200,
		}
	);
}
