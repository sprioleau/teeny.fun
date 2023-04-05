export default function generateShortCode(desiredLength = 6) {
	const charactersToDecimalPoint = 2;
	const MAX_LENGTH = 8;
	const length = Math.min(desiredLength, MAX_LENGTH) + charactersToDecimalPoint;
	return Math.random().toString(36).substring(charactersToDecimalPoint, length);
}
