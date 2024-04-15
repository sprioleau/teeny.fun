import { ERROR_MESSAGES } from "@/constants";
import { z } from "zod";
import GraphemeSplitter from "grapheme-splitter";

const splitter = new GraphemeSplitter();

function normalizeUrlLikeString(string: string) {
	const SECERE_PROTOCOL = "https://";
	return string.startsWith(SECERE_PROTOCOL) ? string : `${SECERE_PROTOCOL}${string}`;
}

export const codeSchema = z
	.string()
	.emoji("Only emojis are allowed")
	.superRefine((emojiString, context) => {
		const emojisCount = splitter.countGraphemes(emojiString);

		if (emojisCount < 3) {
			context.addIssue({
				code: z.ZodIssueCode.custom,
				message: "Must be at least 3 emojis",
			});
		}

		if (emojisCount > 6) {
			context.addIssue({
				code: z.ZodIssueCode.custom,
				message: "Must be at most 6 emojis",
			});
		}
	});

export const createUrlSchema = z.object({
	"destination-url": z
		.string()
		.transform(normalizeUrlLikeString)
		.pipe(z.string().url(ERROR_MESSAGES.INVALID_URL)),
	code: codeSchema,
});
