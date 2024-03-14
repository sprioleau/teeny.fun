import type { Config } from "drizzle-kit";
import { cwd } from "node:process";
import { loadEnvConfig } from "@next/env";

loadEnvConfig(cwd());

export default {
	schema: "./src/db/schema.ts",
	out: "./src/db/migrations",
	driver: "pg",
	dbCredentials: {
		connectionString: process.env.DATABASE_URL!,
	},
} satisfies Config;
