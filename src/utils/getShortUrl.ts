import { getBaseUrl } from "./api";
import { type UrlWithMetadata } from "~/pages";

export default function getShortUrl({ code }: { code: UrlWithMetadata["code"] }) {
	return `${getBaseUrl()}/${code}`;
}
