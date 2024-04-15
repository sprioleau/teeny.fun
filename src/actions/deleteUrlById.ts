"use server";

import { PERSISTED_CLIENT_KEY } from "@/constants";
import { db } from "@/db";
import { urls } from "@/db/schema";
import { getParsedFormData } from "@/utils";
// import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { z } from "zod";

const formDataSchema = z.object({
	"url-id": z.coerce.number(),
});

export default async function deleteUrlById(formData: FormData) {
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

		await db.delete(urls).where(
			and(
				eq(urls.id, parsedFormData["url-id"]),
				eq(urls.clientKey, clientKey)
				// eq(urls.userAuthProviderId, authenticatedUserId),
			)
		);

		revalidatePath("/");
	} catch (caughtError) {
		// TODO: Handle error
		console.error("🤫 ", caughtError);
	}
}
