"use server";

import { db } from "@/db";
import { users, metadata, urls } from "@/db/schema";
import { emojiToCodePoints, generateShortCode } from "@/utils";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
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
	.optional();

export default async function createUrl(formData: FormData) {
	const destinationUrl = formData.get("destination-url");

	if (!destinationUrl || typeof destinationUrl !== "string") {
		throw new Error("Destination URL is required");
	}

	const { userId: authProviderId } = auth();

	if (!authProviderId) {
		throw new Error("User is required");
	}

	let dbUser = await db.query.users.findFirst({
		where: (users, { eq }) => eq(users.authProviderId, authProviderId),
	});

	if (!dbUser) {
		// Insert Auth Provider User to DB
		await db
			.insert(users)
			.values({
				authProviderId,
			})
			.onConflictDoNothing();
	}

	dbUser = await db.query.users.findFirst({
		where: (users, { eq }) => eq(users.authProviderId, authProviderId),
	});

	if (!dbUser) {
		throw new Error("There was a problem adding user to DB");
	}

	// Get URL Metadata
	// TODO: Use a transaction
	// TODO: abstract to function that includes fallbacks for title, image and icon, etc.
	// Reference for fallbacks: https://github.com/mozilla/page-metadata-parser/blob/master/parser.js
	const fetchedMetadata = await urlMetadata(destinationUrl);
	const parsedMetadata = metadataSchema.safeParse({ ...fetchedMetadata, icon: fetchedMetadata.favicons?.[0].href });

	if (!parsedMetadata.success || !parsedMetadata?.data) {
		throw new Error("Metadata parsing unsuccessful");
	}

	// Insert Metadata
	const [persistedMetadata] = await db.insert(metadata).values(parsedMetadata.data).returning();

	// Insert URL
	const code = generateShortCode();

	await db.insert(urls).values({
		code,
		codePoints: emojiToCodePoints(code),
		destinationUrl,
		userId: dbUser.id,
		userAuthProviderId: dbUser.authProviderId,
		metadataId: persistedMetadata?.id,
	});

	revalidatePath("/");
}
