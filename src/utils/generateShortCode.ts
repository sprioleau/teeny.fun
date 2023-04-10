import pickRandomElement from "./pickRandomElement";
import { topEmojis } from "~/constants/topEmojis";

export default function generateShortCode({ length = 3 }: { length?: number } = {}) {
	let code = "";

	for (let i = 0; i < length; i++) {
		code += pickRandomElement(topEmojis);
	}

	return code;
}
