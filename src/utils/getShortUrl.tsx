import { type Url } from "@prisma/client";

export default function getShortUrl({ code }: { code: Url["code"] }) {
	const origin = new URL(location.href).origin;
	return `${origin}/${code}`;
}
