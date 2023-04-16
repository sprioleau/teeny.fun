import QRCode from "qrcode";

export default async function generateQRCode(
	{ text, size }: { text: string; size?: number } = { text: "", size: 256 }
) {
	return await QRCode.toDataURL(text, { width: size });
}
