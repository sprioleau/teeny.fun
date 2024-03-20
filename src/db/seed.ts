import { db } from "@/db";
import { emojiToCodePoints } from "@/utils";
import { metadata, urls, users } from "./schema";

async function seed() {
	try {
		console.log("🌱 Seeding database...");

		await db.delete(users);
		await db.delete(urls);
		await db.delete(metadata);

		// Insert Initial User
		const [initialUser] = await db
			.insert(users)
			.values([
				{
					authProviderId: process.env.INITIAL_USER_AUTH_PROVIDER_ID!,
				},
			])
			.returning();

		// Insert Initial Metadata
		const [initialUrlMetadata] = await db
			.insert(metadata)
			.values([
				{
					title: "S. Prioleau",
					description: "Personal Website of San'Quan Prioleau, Senior Frontend Engineer",
				},
			])
			.returning();

		// Insert Initial Url
		await db.insert(urls).values([
			{
				code: "🙂🙂🙂",
				codePoints: emojiToCodePoints("🙂🙂🙂"),
				destinationUrl: "https://sprioleau.dev",
				userId: initialUser.id,
				userAuthProviderId: initialUser.authProviderId,
				metadataId: initialUrlMetadata.id,
			},
		]);

		console.log("✅ Seeding successful");
	} catch (caughtError) {
		console.error(caughtError);
		throw new Error("😞 Failed to seed database");
	}
}

seed();
