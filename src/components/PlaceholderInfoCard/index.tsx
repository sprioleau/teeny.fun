import UrlInfoCard from "@/components/UrlInfoCard";

export default function PlaceholderInfoCard() {
	return (
		<UrlInfoCard
			style={{ opacity: 0.8 }}
			url={{
				id: 0,
				userAuthProviderId: "user",
				destinationUrl: "https://your-destination-url.com/a-path?and-mumbo=jumbo",
				code: "❓❓❓",
				codePoints: "10067 10067 10067",
				visits: 0,
				createdAt: new Date(),
				updatedAt: new Date(),
				userId: "user",
				metadataId: 0,
				metadata: {
					id: 0,
					title: null,
					description: null,
					image: null,
					icon: null,
					url: null,
				},
			}}
			isPlaceholder
		/>
	);
}
