import { drizzle } from "drizzle-orm/neon-http";
import { migrate } from "drizzle-orm/neon-http/migrator";
import { sql } from "@/db";

const db = drizzle(sql);

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
