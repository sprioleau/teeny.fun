"use client";

import { createUrl } from "@/actions";

export default function UrlForm() {
	return (
		<form action={createUrl}>
			<label htmlFor="destination-url">Destination URL</label>
			<input
				type="text"
				name="destination-url"
				id="destination-url"
			/>
			<button>Teenify</button>
		</form>
	);
}
