import { z } from "zod";
import { db } from "@/db";
import { inArray, isNull } from "drizzle-orm";

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);

	const clientKey = searchParams.get("clientKey");

	if (!clientKey || typeof clientKey !== "string") {
		return Response.json({ error: "Invalid client key" }, { status: 400 });
	}

	const publicUrls = await db.query.urls.findMany({
		// TODO: finish
		where: (urls, { and, eq }) =>
			and(isNull(urls.userAuthProviderId), eq(urls.clientKey, clientKey)),
		with: {
			metadata: true,
		},
	});

	return Response.json({ publicUrls: publicUrls ?? [] }, { status: 200 });
}

export async function POST(request: Request) {
	const body = await request.json();

	const bodySchema = z.object({
		codePoints: z
			.string()
			.transform((string) => JSON.parse(string))
			.pipe(z.array(z.string())),
	});

	const parsedBody = bodySchema.safeParse(body);

	if (!parsedBody.success || parsedBody.data.codePoints.length === 0) {
		return Response.json({ error: "Invalid code points" }, { status: 400 });
	}

	const publicUrls = await db.query.urls.findMany({
		// TODO: finish
		where: (urls, { and }) =>
			and(isNull(urls.userAuthProviderId), inArray(urls.codePoints, parsedBody.data.codePoints)),
		with: {
			metadata: true,
		},
	});

	return Response.json({ publicUrls: publicUrls ?? [] }, { status: 200 });
}
