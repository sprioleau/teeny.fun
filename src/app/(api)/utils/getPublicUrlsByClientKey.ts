import { urlWithMetadataSelectSchema } from "@/db/schema";
import { z } from "zod";

export default async function getPublicUrlsByClientKey({ clientKey }: { clientKey: string }) {
	const searchParams = new URLSearchParams({ clientKey });

	const response = await fetch(`urls/?${searchParams}`, {
		headers: {
			"Content-Type": "application/json",
		},
	});
	const data = await response.json();

	const parsedData = z.object({ publicUrls: z.array(urlWithMetadataSelectSchema) }).safeParse(data);

	if (!parsedData.success) {
		// TODO: Handle error
		// console.error(parsedData.error.issues);
		return [];
	}

	return parsedData.data.publicUrls;
}
