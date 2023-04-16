import formatNumber from "./formatNumber";

export default function formatQuantityString({
	quantity,
	nouns: [singular, plural],
}: {
	quantity: number;
	nouns: [string, string];
}) {
	if (quantity === 1) return `1 ${singular}`;
	return `${formatNumber(quantity)} ${plural}`;
}
