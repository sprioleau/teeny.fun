import { type UrlWithMetadata } from "~/pages";
import { getBaseUrl } from "./api";

export default function getShortUrl({ code }: { code: UrlWithMetadata["code"] }) {
	return `${getBaseUrl()}/${code}`;
}
