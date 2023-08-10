import { type NextRequest } from "next/server";
import { prisma } from "@/server/db";
import { emojiToCodePoints } from "@/utils";

export const config = {
	runtime: "edge",
};

export default async function handler(req: NextRequest) {
	const { searchParams } = new URL(req.url);
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

	const url = await prisma.url.findUnique({
		where: {
			codePoints,
		},
	});

	if (!url) {
		return new Response(JSON.stringify({ data: null, error: "URL not found" }), {
			headers: {
				status: "404",
				"content-type": "application/json;charset=UTF-8",
			},
		});
	}

	const updatedUrl = await prisma.url.update({
		where: {
			codePoints,
		},
		data: {
			visits: {
				increment: 1,
			},
		},
	});

	const result = { data: updatedUrl, error: null };

	return new Response(JSON.stringify(result), {
		headers: {
			status: "200",
			"content-type": "application/json;charset=UTF-8",
		},
	});
}
