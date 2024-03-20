import { z } from "zod";

export const createUrlSchema = z.object({
	"destination-url": z.string().url(),
	// code: z.string().min(1),
});
