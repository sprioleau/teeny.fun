"use server";

import { db } from "@/db";
import { urls } from "@/db/schema";
import { emojiToCodePoints, getParsedFormData } from "@/utils";
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const formDataSchema = z.object({
	"url-id": z.coerce.number(),
	code: z
		.string()
		.emoji("Only emojis are allowed")
		.min(3, "Must be at least 3 emojis")
		.max(6, "Must be at most 6 emojis"),
});

export default async function updateShortcodeById(formData: FormData) {
	try {
		const { userId: authenticatedUserId } = auth();

		if (!authenticatedUserId) {
			throw new Error("Not authenticated");
		}

		const parsedFormData = getParsedFormData({
			formData,
			schema: formDataSchema,
		});

		await db
			.update(urls)
			.set({
				code: parsedFormData["code"],
				codePoints: emojiToCodePoints(parsedFormData["code"]),
			})
			.where(
				and(eq(urls.id, parsedFormData["url-id"]), eq(urls.userAuthProviderId, authenticatedUserId))
			);

		revalidatePath("/");
	} catch (caughtError) {
		// TODO: Handle error, rethrow?
		console.error("🤫 ", caughtError);
	}
}
