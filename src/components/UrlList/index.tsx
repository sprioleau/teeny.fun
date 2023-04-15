import { UrlInfoCard } from "~/components";
import styles from "./index.module.scss";
import { type UrlWithMetadata } from "~/pages";
import { api } from "~/utils/api";
import { PROJECT_REPO_URL } from "~/constants/projectRepoUrl";

type Props = {
	urls: UrlWithMetadata[];
};

export default function UrlList({ urls = [] }: Props) {
	if (urls.length === 0) return null;

	const { data: projectRepoUrl } = api.url.getExample.useQuery({
		destinationUrl: PROJECT_REPO_URL,
	});

	return (
		<ul className={styles["url-list"]}>
			{projectRepoUrl && <UrlInfoCard url={projectRepoUrl} />}
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
