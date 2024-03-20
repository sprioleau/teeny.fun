import { db } from "@/db";
import { urls } from "@/db/schema";
import { emojiToCodePoints } from "@/utils";
import { eq, sql } from "drizzle-orm";

export const runtime = "edge";

// TODO: Validate with Zod
export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const code = searchParams.get("code");

	if (Array.isArray(code) || !code) {
		return new Response(JSON.stringify({ error: "code is invalid" }), {
			headers: {
				status: "500",
				"content-type": "application/json;charset=UTF-8",
			},
		});
	}

	const codePoints = emojiToCodePoints(code);

	const url = await db.query.urls.findFirst({
		where: (url, { eq }) => eq(url.codePoints, codePoints),
	});

	if (!url) {
		return new Response(JSON.stringify({ data: null, error: "URL not found" }), {
			headers: {
				status: "404",
				"content-type": "application/json;charset=UTF-8",
			},
		});
	}

	const [updatedUrl] = await db
		.update(urls)
		.set({
			visits: sql`${urls.visits} + 1`,
		})
		.where(eq(urls.codePoints, codePoints))
		.returning();

	return Response.json({ data: updatedUrl, error: null }, { status: 200 });
}
