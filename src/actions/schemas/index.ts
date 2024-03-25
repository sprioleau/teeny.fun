import { z } from "zod";

export const createUrlSchema = z.object({
	"destination-url": z.string().url("Invalid URL"),
	code: z
		.string()
		.emoji("Only emojis are allowed")
		.min(3, "Must be at least 3 emojis")
		.max(6, "Must be at most 6 emojis"),
});
