import UrlInfoCard from "../UrlInfoCard";
import styles from "./index.module.scss";

export default function PlaceholderInfoCard() {
	return (
		<div className={styles["main"]}>
			<UrlInfoCard
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
		</div>
	);
}
