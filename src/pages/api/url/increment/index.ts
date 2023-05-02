import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/server/db";
import { emojiToCodePoints } from "@/utils";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { code } = req.query;

	if (Array.isArray(code) || !code) {
		res.status(500).json({ error: "code is invalid" });
		return;
	}

	const codePoints = emojiToCodePoints(code);

	const url = await prisma.url.findUnique({
		where: {
			codePoints,
		},
	});

	if (!url) {
		res.status(404).json({ data: null, error: "URL not found" });
		return;
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

	res.status(200).json({ data: updatedUrl, error: null });
}
