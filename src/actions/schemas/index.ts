import { z } from "zod";

export const createUrlSchema = z.object({
	"destination-url": z.string().url("Invalid URL"),
	// code: z.string().min(1),
});
