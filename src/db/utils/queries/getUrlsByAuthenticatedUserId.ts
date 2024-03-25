import { PERSISTED_CLIENT_KEY } from "@/constants";
import { db } from "@/db";
import { urls as urlsTable } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq, isNull } from "drizzle-orm";
import { cookies } from "next/headers";

export default async function getUrlsByAuthenticatedUserId(
	authenticatedUserId: ReturnType<typeof auth>["userId"]
) {
	const clientKey = cookies().get(PERSISTED_CLIENT_KEY)?.value ?? "";

	const urls = await db.query.urls.findMany({
		where: (urls, { eq, and, or }) => {
			if (!authenticatedUserId) {
				return and(isNull(urls.userAuthProviderId), eq(urls.clientKey, clientKey));
			} else {
				return and(
					or(isNull(urls.userAuthProviderId), eq(urls.userAuthProviderId, authenticatedUserId)),
					eq(urls.clientKey, clientKey)
				);
			}
		},
		with: {
			metadata: true,
		},
	});

	// Claim public URLs with the same `clientKey`
	// Update existing urls with authenticatedUserId
	if (authenticatedUserId) {
		await db
			.update(urlsTable)
			.set({ userAuthProviderId: authenticatedUserId })
			.where(eq(urlsTable.clientKey, clientKey));
	}

	return urls;
}
