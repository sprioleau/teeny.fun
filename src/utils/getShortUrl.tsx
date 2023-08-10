import { type Url } from "@prisma/client/edge";

export default function getShortUrl({ code }: { code: Url["code"] }) {
	const origin = typeof window !== "undefined" ? new URL(window.location.href).origin : "";
	return `${origin}/${code}`;
}
