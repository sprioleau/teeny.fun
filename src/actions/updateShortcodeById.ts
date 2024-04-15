"use server";

import { PERSISTED_CLIENT_KEY } from "@/constants";
import { db } from "@/db";
import { urls } from "@/db/schema";
import { emojiToCodePoints, getParsedFormData } from "@/utils";
// import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { z } from "zod";
import { codeSchema } from "./schemas";

const formDataSchema = z.object({
	"url-id": z.coerce.number(),
	code: codeSchema,
});

export default async function updateShortcodeById(formData: FormData) {
	try {
		const clientKey = cookies().get(PERSISTED_CLIENT_KEY)?.value;

		if (!clientKey) {
			throw new Error("Invalid client key");
		}

		// const { userId: authenticatedUserId } = auth();

		// if (!authenticatedUserId) {
		// 	throw new Error("Not authenticated");
		// }

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
				and(
					eq(urls.id, parsedFormData["url-id"]),
					eq(urls.clientKey, clientKey)
					// eq(urls.userAuthProviderId, authenticatedUserId)
				)
			);

		revalidatePath("/");
	} catch (caughtError) {
		// TODO: Handle error, rethrow?
		console.error("🤫 ", caughtError);
	}
}
