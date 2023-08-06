export default function getEmojiStringLength(emojiString: string) {
	return Array.from(new Intl.Segmenter().segment(emojiString)).length;
}
