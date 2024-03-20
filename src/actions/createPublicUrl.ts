"use server";

import { db } from "@/db";
import { metadata, urls, users } from "@/db/schema";
import { Metadata, User } from "@/db/types";
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

export default async function createPublicUrl(formData: FormData) {
	const destinationUrl = formData.get("destination-url");

	if (!destinationUrl || typeof destinationUrl !== "string") {
		throw new Error("Destination URL is required");
	}

	// const { userId: authProviderId } = auth();

	// if (!authProviderId) {
	// 	// TODO: Allow user to create URL anonymously
	// 	throw new Error("User is required");
	// }

	// const dbUser = await getDbUser(authProviderId);

	// Insert URL
	const code = generateShortCode();

	await createUrlWithMetadata({ destinationUrl, code, dbUser: null });
}

async function getDbUser(authProviderId: string) {
	// Get User by Auth Provider ID
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

	return dbUser;
}

async function createUrlWithMetadata({
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
		icon: fetchedMetadata.favicons?.[0].href,
	});

	if (!parsedMetadata.success || !parsedMetadata?.data) {
		// TODO: Handle error
		throw new Error("Metadata parsing unsuccessful");
	}

	// Insert Metadata
	const [persistedMetadata] = await db.insert(metadata).values(parsedMetadata.data).returning();

	await insertUrl({
		destinationUrl,
		code,
		dbUser,
		metadata: persistedMetadata,
	});

	return persistedMetadata;
}

async function insertUrl({
	destinationUrl,
	code,
	dbUser,
	metadata,
}: {
	destinationUrl: string;
	code: string;
	dbUser: User | null;
	metadata: Metadata;
}) {
	await db.insert(urls).values({
		code,
		codePoints: emojiToCodePoints(code),
		destinationUrl,
		userId: dbUser?.id ?? null,
		userAuthProviderId: dbUser?.authProviderId ?? null,
		metadataId: metadata.id,
	});
}
