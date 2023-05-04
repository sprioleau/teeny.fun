import { type Url } from "@prisma/client";
import { getBaseUrl } from "./api";

export default function getShortUrl({ code }: { code: Url["code"] }) {
	return `${getBaseUrl()}/${code}`;
}
