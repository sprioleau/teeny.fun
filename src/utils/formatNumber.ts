export default function formatNumber(
	number: number,
	options: { decimals: 1 | 2 } = { decimals: 1 }
) {
	if (number < 1_000) {
		return number;
	} else if (number < 1_000_000) {
		return `${(number / 1_000).toFixed(options.decimals)}K`;
	} else {
		return `${(number / 1_000_000).toFixed(options.decimals)}M`;
	}
}
