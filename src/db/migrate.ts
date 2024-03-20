import { migrate } from "drizzle-orm/neon-http/migrator";
import { db } from "@/db";

async function runMigration() {
	try {
		await migrate(db, {
			migrationsFolder: "src/db/migrations",
		});

		console.log("✅ Migration successful");
	} catch (caughtError) {
		console.error("🤫 ", caughtError);
		process.exit(1);
	}
}

runMigration();
