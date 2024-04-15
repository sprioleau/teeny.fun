import { db } from "@/db";
import type { UrlWithMetadata } from "@/db/types";

export default async function getUrlsByClientKey(
	clientKey: string | undefined
): Promise<UrlWithMetadata[]> {
	if (!clientKey) {
		return [];
	}

	// Get URLs by clientKey
	let urls = await db.query.urls.findMany({
		where: (urls, { eq }) => eq(urls.clientKey, clientKey),
		with: {
			metadata: true,
		},
	});

	return urls;
}
