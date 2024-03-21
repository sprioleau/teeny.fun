"use server";

import { generateShortCode } from "@/utils";
import createUrlWithMetadata from "@/utils/db/createUrlWithMetadata";

export default async function createPublicUrl(formData: FormData) {
	const destinationUrl = formData.get("destination-url");

	if (!destinationUrl || typeof destinationUrl !== "string") {
		throw new Error("Destination URL is required");
	}

	// Insert URL
	const code = generateShortCode();

	await createUrlWithMetadata({ destinationUrl, code, dbUser: null });
}
