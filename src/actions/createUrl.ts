"use server";

import { getUserByAuthProviderId } from "@/db/utils";
import { generateShortCode, getParsedFormData } from "@/utils";
import createUrlWithMetadata from "@/utils/db/createUrlWithMetadata";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { createUrlSchema } from "./schemas";

export default async function createUrl(formData: FormData) {
	const { "destination-url": destinationUrl, clientKey } = getParsedFormData({
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

	revalidatePath("/");
}
