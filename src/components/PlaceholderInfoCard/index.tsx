import { UrlInfoCard } from "@/components";

export default function PlaceholderInfoCard() {
	return (
		<UrlInfoCard
			style={{ opacity: 0.5 }}
			url={{
				id: "placeholder",
				destinationUrl: "https://your-destination-url.com/a-path?and-mumbo=jumbo",
				code: "❓❓❓",
				codePoints: "10067 10067 10067",
				visits: 0,
				createdAt: new Date(),
				updatedAt: new Date(),
				userId: null,
				metadataId: null,
				metadata: null,
			}}
		/>
	);
}
