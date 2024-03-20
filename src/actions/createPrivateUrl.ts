"use server";

import { getUserByAuthProviderId } from "@/db/utils";
import { generateShortCode, getParsedFormData } from "@/utils";
import createUrlWithMetadata from "@/utils/db/createUrlWithMetadata";
import { auth } from "@clerk/nextjs/server";
import { createUrlSchema } from "./schemas";

export default async function createPrivateUrl(formData: FormData) {
	const { "destination-url": destinationUrl } = getParsedFormData({
		formData,
		schema: createUrlSchema,
	});

	if (!destinationUrl || typeof destinationUrl !== "string") {
		throw new Error("Destination URL is required");
	}

	const { userId: authProviderId } = auth();

	// if (!authProviderId) {
	// 	// TODO: Allow user to create URL anonymously
	// 	throw new Error("User is required");
	// }

	const dbUser = await getUserByAuthProviderId(authProviderId);

	// Insert URL
	const newUrl = await createUrlWithMetadata({ destinationUrl, code: generateShortCode(), dbUser });

	return newUrl;
}
