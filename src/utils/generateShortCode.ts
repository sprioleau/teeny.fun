import { topEmojis } from "@/constants";
import pickRandomElement from "./pickRandomElement";

export default function generateShortCode({ length = 3 }: { length?: number } = {}) {
	let code = "";

	for (let i = 0; i < length; i++) {
		code += pickRandomElement(topEmojis);
	}

	return code;
}
