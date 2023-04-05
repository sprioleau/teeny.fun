import fetchMeta, { type fetchedMeta } from "fetch-meta-tags";
import { type NextRequest } from "next/server";
import { isValidUrl } from "~/utils";

export type FetchedMeta = fetchedMeta;

type ReturnedData = {
	data: FetchedMeta | null;
	error: string | null;
};

export const config = {
	runtime: "edge",
};

export default async function handler(req: NextRequest) {
	// const { url } = req.query;

	const { searchParams } = new URL(req.url);
	const url = searchParams.get("url");

	if (!url || typeof url !== "string" || !isValidUrl(url)) {
		// return res.status(400).json({ data: null, error: "Invalid URL" });

		return new Response(JSON.stringify({ data: null, error: "Invalid URL" }), {
			headers: {
				status: "400",
				"content-type": "application/json;charset=UTF-8",
			},
		});
	}

	const result: ReturnedData = {
		data: null,
		error: null,
	};

	try {
		const metadata = (await fetchMeta(url)) as ReturnType<typeof fetchMeta>;
		result.data = metadata;
	} catch (error) {
		result.error = "Error fetching metadata";
	}

	// res.status(200).json(result);

	return new Response(JSON.stringify(result), {
		headers: {
			status: "200",
			"content-type": "application/json;charset=UTF-8",
		},
	});
}
