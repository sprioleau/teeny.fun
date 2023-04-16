export default async function copyText(text: string) {
	await navigator.clipboard.writeText(text);
	// TODO: show a toast
}
