import { urlWithMetadataSelectSchema } from "@/db/schema";
import { z } from "zod";

export default async function getPublicUrlsByCodePoints({ clientKey }: { clientKey: string }) {
	// export default async function getPublicUrlsByCodePoints({ codePointsArray, }: { codePointsArray: string[]; }) {
	// const response = await fetch("/urls", {
	// 	method: "POST",
	// 	headers: {
	// 		"Content-Type": "application/json",
	// 	},
	// 	body: JSON.stringify({ codePoints: JSON.stringify(codePointsArray) }),
	// });

	const searchParams = new URLSearchParams({ clientKey });

	const response = await fetch(`urls/?${searchParams}`, {
		// method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		// body: JSON.stringify({ codePoints: JSON.stringify(codePointsArray) }),
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
