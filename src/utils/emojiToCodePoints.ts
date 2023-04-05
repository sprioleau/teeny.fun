export default function emojiToCodePoints(emojiString: string) {
	return [...emojiString]
		.map((x) => {
			return x.codePointAt(0).toString(16);
		})
		.join(" ");
}
