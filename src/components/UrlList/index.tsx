import { PlaceholderInfoCard, UrlInfoCard } from "~/components";
import { PROJECT_REPO_URL } from "~/constants/projectRepoUrl";
import { type UrlWithMetadata } from "~/pages";
import { api } from "~/utils/api";
import styles from "./index.module.scss";

type Props = {
	urls: UrlWithMetadata[];
};

export default function UrlList({ urls = [] }: Props) {
	// TODO: Show combined URL list (including private URLs for user)

	if (!urls) return null;

	const { data: projectRepoUrl } = api.url.getProjectRepoUrl.useQuery();

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
