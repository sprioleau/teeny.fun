import { z } from "zod";

export const createUrlSchema = z.object({
	"destination-url": z.string().url("Invalid URL"),
	clientKey: z.string().min(1),
	// code: z.string().min(1),
});
