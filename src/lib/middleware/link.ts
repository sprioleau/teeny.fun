import { codeSchema } from "@/actions/schemas";
import { db } from "@/db";
import { urls } from "@/db/schema";
import { Url } from "@/db/types";
import { emojiToCodePoints } from "@/utils";
import { eq, sql } from "drizzle-orm";
import { NextResponse, type NextRequest } from "next/server";

export const congifg = { runtime: "edge" };

// prettier-ignore
export const HOME_HOSTNAMES = new Set([
	"localhost:3000",
	"teeny.fun",
]);

// TODO: Update
export default async function LinkMiddleware(request: NextRequest) {
	const { domain, code } = parse(request);

	const parsedCode = codeSchema.safeParse(code);

	// If pathname is not a valid shortcode, go to next middleware
	if (!parsedCode.success) {
		return NextResponse.next();
	}

	if (!domain || !parsedCode.success) {
		return NextResponse.next();
	}

	const { data: urlData, error } = await getUrlAndIncrementHits(parsedCode.data);

	if (error || !urlData) {
		console.error(error);
		// TODO: Inform user of error
		return NextResponse.next();
	}

	return NextResponse.redirect(urlData.destinationUrl);
}

export const parse = (request: NextRequest) => {
	let domain = request.headers.get("host") ?? "";
	domain = (request.headers.get("host") ?? "").replace("www.", ""); // remove www. from domain

	if (HOME_HOSTNAMES.has(domain)) domain = "http://localhost:3000";

	const encodedCode = request.nextUrl.pathname.split("/")[1] ?? "";
	const code = decodeURIComponent(encodedCode); // to handle foreign languages like Hebrew

	return { domain, code };
};

export async function getUrlAndIncrementHits(code: Url["code"]) {
	if (Array.isArray(code) || !code) {
		return { data: null, error: "code is invalid" };
	}

	const codePoints = emojiToCodePoints(code);

	const url = await db.query.urls.findFirst({
		where: (url, { eq }) => eq(url.codePoints, codePoints),
	});

	if (!url) {
		return { data: null, error: "URL not found" };
	}

	const [updatedUrl] = await db
		.update(urls)
		.set({
			visits: sql`${urls.visits} + 1`,
		})
		.where(eq(urls.codePoints, codePoints))
		.returning();

	return { data: updatedUrl, error: null };
}
