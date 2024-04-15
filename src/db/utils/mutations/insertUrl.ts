import { urls } from "@/db/schema";
import { db } from "@/db";
import { Metadata, User } from "@/db/types";
import { emojiToCodePoints } from "@/utils";

export default async function insertUrl({
	destinationUrl,
	code,
	metadataId,
	// dbUser = null,
	clientKey,
}: {
	destinationUrl: string;
	code: string;
	metadataId: Metadata["id"];
	// dbUser?: User | null;
	clientKey: string | null;
}) {
	return await db
		.insert(urls)
		.values({
			code,
			codePoints: emojiToCodePoints(code),
			destinationUrl,
			// userId: dbUser?.id ?? null,
			clientKey,
			// userAuthProviderId: dbUser?.authProviderId ?? null,
			metadataId,
		})
		.returning();
}
