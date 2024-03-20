import { db } from "@/db";
import { users } from "@/db/schema";

export default async function getUserByAuthProviderId(authProviderId: string | null) {
	if (!authProviderId) {
		return null;
	}

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
