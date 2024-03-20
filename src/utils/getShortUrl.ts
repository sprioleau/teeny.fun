import { Url } from "@/db/types";

export default function getShortUrl({ code }: { code: Url["code"] }) {
	const origin = typeof window !== "undefined" ? new URL(window.location.href).origin : "";
	return `${origin}/${code}`;
}
