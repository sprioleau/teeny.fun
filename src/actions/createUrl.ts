"use server";

import { getUserByAuthProviderId } from "@/db/utils";
import { generateShortCode, getParsedFormData } from "@/utils";
import createUrlWithMetadata from "@/utils/db/createUrlWithMetadata";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { createUrlSchema } from "./schemas";
import { PERSISTED_CLIENT_KEY } from "@/constants";
import { cookies } from "next/headers";

export default async function createUrl(formData: FormData) {
	const clientKey = cookies().get(PERSISTED_CLIENT_KEY)?.value ?? crypto.randomUUID();

	const { "destination-url": destinationUrl } = getParsedFormData({
		formData,
		schema: createUrlSchema,
	});

	if (!destinationUrl || typeof destinationUrl !== "string") {
		throw new Error("Destination URL is required");
	}

	const { userId: authProviderId } = auth();

	const dbUser = await getUserByAuthProviderId(authProviderId);

	// Insert URL
	await createUrlWithMetadata({
		destinationUrl,
		code: generateShortCode(),
		dbUser,
		clientKey,
	});

	cookies().set(PERSISTED_CLIENT_KEY, clientKey, {
		maxAge: 60 * 60 * 24 * 7, // 7 days
		httpOnly: true,
	});

	revalidatePath("/");
}
