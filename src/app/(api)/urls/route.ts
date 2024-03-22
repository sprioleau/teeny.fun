import { db } from "@/db";
import { isNull } from "drizzle-orm";

export const dynamic = "force-dynamic";
export const runtime = "edge";

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);

	const clientKey = searchParams.get("clientKey");

	if (!clientKey || typeof clientKey !== "string") {
		return Response.json({ error: "Invalid client key" }, { status: 400 });
	}

	const publicUrls = await db.query.urls.findMany({
		where: (urls, { and, eq }) =>
			and(isNull(urls.userAuthProviderId), eq(urls.clientKey, clientKey)),
		with: {
			metadata: true,
		},
	});

	return Response.json({ publicUrls }, { status: 200 });
}
