import { urls } from "@/db/schema";
import { db } from "@/db";
import { Metadata, User } from "@/db/types";
import { emojiToCodePoints } from "@/utils";

export default async function insertUrl({
	destinationUrl,
	code,
	metadataId,
	dbUser = null,
}: {
	destinationUrl: string;
	code: string;
	metadataId: Metadata["id"];
	dbUser?: User | null;
}) {
	return await db
		.insert(urls)
		.values({
			code,
			codePoints: emojiToCodePoints(code),
			destinationUrl,
			userId: dbUser?.id ?? null,
			userAuthProviderId: dbUser?.authProviderId ?? null,
			metadataId,
		})
		.returning();
}
