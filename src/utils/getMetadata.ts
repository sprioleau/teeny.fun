import { isValidUrl } from "~/utils";

export default async function getMetadata(url: string) {
	if (!isValidUrl(url)) return null;

	// fetch url text and parse out metadata
	const res = await fetch(url);
	const text = await res.text();
	const metadata = parseMetadata(text);

	return metadata;
}

export type Metadata = {
	title: string;
	description: string;
	image: string;
	url: string;
};

function parseMetadata(text: string) {
	const parser = new DOMParser();
	const doc = parser.parseFromString(text, "text/html");

	const metadata: Metadata = {
		title: doc.querySelector("title")?.textContent ?? "",
		description: doc.querySelector("meta[name=description]")?.getAttribute("content") ?? "",
		image: doc.querySelector("meta[property='og:image']")?.getAttribute("content") ?? "",
		url: doc.querySelector("meta[property='og:url']")?.getAttribute("content") ?? "",
	};

	return metadata;
}
