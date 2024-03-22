import { db } from "@/db";
import { metadata } from "@/db/schema";
import { User } from "@/db/types";
import { insertUrl } from "@/db/utils";
import urlMetadata from "url-metadata";
import { z } from "zod";

const metadataSchema = z
	.object({
		title: z.string(),
		description: z.string(),
		image: z.string(),
		icon: z.string().nullable(),
		url: z.string(),
	})
	.partial({
		title: true,
		description: true,
		image: true,
		icon: true,
	});

export default async function createUrlWithMetadata({
	destinationUrl,
	code,
	dbUser,
	clientKey,
}: {
	code: string;
	destinationUrl: string;
	dbUser: User | null;
	clientKey: string;
}) {
	// Get URL Metadata
	// TODO: Use a transaction
	// TODO: abstract to function that includes fallbacks for title, image and icon, etc.
	// Reference for fallbacks: https://github.com/mozilla/page-metadata-parser/blob/master/parser.js
	const fetchedMetadata = await urlMetadata(destinationUrl);
	const parsedMetadata = metadataSchema.safeParse({
		...fetchedMetadata,
		icon: getFaviconUrl({ iconUrl: fetchedMetadata.favicons?.[0]?.href, destinationUrl }),
	});

	if (!parsedMetadata.success) {
		// TODO: Handle error
		console.error(parsedMetadata.error.issues);
		throw new Error("Metadata parsing unsuccessful");
	}

	// Insert Metadata
	const [persistedMetadata] = await db
		.insert(metadata)
		.values(parsedMetadata.data)
		.onConflictDoUpdate({ target: metadata.url, set: parsedMetadata.data })
		.returning();

	const [insertedUrl] = await insertUrl({
		destinationUrl,
		code,
		dbUser,
		clientKey: Boolean(clientKey) ? clientKey : null, // Store
		metadataId: persistedMetadata.id,
	});

	return insertedUrl;
}

function getFaviconUrl({
	iconUrl,
	destinationUrl,
}: {
	iconUrl: string | null;
	destinationUrl: string;
}) {
	if (!iconUrl) return null;

	if (iconUrl.startsWith("http")) return iconUrl;

	try {
		const urlObject = new URL(iconUrl, destinationUrl);
		return urlObject.href;
	} catch (error) {
		console.log(error);
		return null;
	}
}
