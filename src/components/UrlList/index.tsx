import { UrlInfoCard } from "~/components";
import styles from "./index.module.scss";
import { type UrlWithMetadata } from "~/pages";

type Props = {
	urls: UrlWithMetadata[];
};

export default function UrlList({ urls = [] }: Props) {
	if (urls.length === 0) return null;

	return (
		<ul className={styles["url-list"]}>
			{urls.map((url) => (
				<UrlInfoCard
					key={url.id}
					url={url}
				/>
			))}
		</ul>
	);
}
