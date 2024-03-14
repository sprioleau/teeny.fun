// import { z } from "zod";

// const envSchema = z.object({
// 	DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
// 	NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z
// 		.string()
// 		.min(1, "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY is required"),
// 	CLERK_SECRET_KEY: z.string().min(1, "CLERK_SECRET_KEY is required"),
// 	INITIAL_USER_AUTH_PROVIDER_ID: z.string().min(1, "INITIAL_USER_AUTH_PROVIDER_ID is required"),
// });

// let ENV = {};

// try {
// 	const parsedEnv = envSchema.safeParse(process.env);
// 	if (!parsedEnv.success) {
// 		throw new Error("Invalid environment variables");
// 	}

// 	ENV = parsedEnv.data;
// } catch (error) {
// 	console.error("❌ Invalid environment variables:", error);
// }

// export { ENV };
