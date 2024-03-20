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
		icon: z.string(),
		url: z.string(),
	})
	.partial();

export default async function createUrlWithMetadata({
	destinationUrl,
	code,
	dbUser,
}: {
	code: string;
	destinationUrl: string;
	dbUser: User | null;
}) {
	// Get URL Metadata
	// TODO: Use a transaction
	// TODO: abstract to function that includes fallbacks for title, image and icon, etc.
	// Reference for fallbacks: https://github.com/mozilla/page-metadata-parser/blob/master/parser.js
	const fetchedMetadata = await urlMetadata(destinationUrl);
	const parsedMetadata = metadataSchema.safeParse({
		...fetchedMetadata,
		icon: fetchedMetadata.favicons?.[0]?.href,
	});

	if (!parsedMetadata.success || !parsedMetadata?.data) {
		// TODO: Handle error
		throw new Error("Metadata parsing unsuccessful");
	}

	// Insert Metadata
	const [persistedMetadata] = await db.insert(metadata).values(parsedMetadata.data).returning();

	const [insertedUrl] = await insertUrl({
		destinationUrl,
		code,
		dbUser,
		metadataId: persistedMetadata.id,
	});

	return insertedUrl;
}
