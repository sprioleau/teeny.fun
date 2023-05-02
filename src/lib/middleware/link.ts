import { type Url } from "@prisma/client";
import { type NextRequest, NextResponse } from "next/server";
import { getBaseUrl } from "@/utils/api";

// prettier-ignore
export const HOME_HOSTNAMES = new Set([
	"localhost:3000",
	"teeny.fun",
]);

export default async function LinkMiddleware(req: NextRequest) {
	const { domain, code } = parse(req);

	if (!domain || !code || code.length === 0) {
		return NextResponse.next();
	}

	const { data: urlData, error } = await getUrlAndIncrementHits(code);

	if (error) {
		// TODO: Inform user of error
		return NextResponse.redirect(getBaseUrl());
	}

	return NextResponse.redirect(urlData.destinationUrl);
}

export const parse = (req: NextRequest) => {
	let domain = req.headers.get("host") ?? "";
	domain = (req.headers.get("host") ?? "").replace("www.", ""); // remove www. from domain

	if (HOME_HOSTNAMES.has(domain)) domain = getBaseUrl();

	const encodedCode = req.nextUrl.pathname.split("/")[1] ?? "";
	const code = decodeURIComponent(encodedCode); // to handle foreign languages like Hebrew

	return { domain, code };
};

export async function getUrlAndIncrementHits(code: string) {
	const requestUrl = new URL("/api/url/increment", getBaseUrl());
	requestUrl.searchParams.set("code", code);
	const res = await fetch(requestUrl.toString());
	return (await res.json()) as { data: Url; error: string };
}
