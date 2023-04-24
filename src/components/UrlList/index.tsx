import { PlaceholderInfoCard, UrlInfoCard } from "~/components";
import { PROJECT_REPO_URL } from "~/constants/projectRepoUrl";
import { type UrlWithMetadata } from "~/pages";
import { api } from "~/utils/api";
import styles from "./index.module.scss";

type Props = {
	urls: UrlWithMetadata[];
};

export default function UrlList({ urls = [] }: Props) {
	const { data: projectRepoUrl } = api.url.getExample.useQuery({
		destinationUrl: PROJECT_REPO_URL,
	});

	return (
		<ul className={styles["url-list"]}>
			{projectRepoUrl && <UrlInfoCard url={projectRepoUrl} />}
			{urls.length === 0 && <PlaceholderInfoCard />}
			{urls
				.filter(({ destinationUrl }) => destinationUrl !== PROJECT_REPO_URL)
				.map((url) => (
					<UrlInfoCard
						key={url.id}
						url={url}
					/>
				))}
		</ul>
	);
}
