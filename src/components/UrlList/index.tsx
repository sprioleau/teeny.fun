import { PlaceholderInfoCard, PublicLinkNotice, UrlInfoCard } from "@/components";
import { type UrlWithMetadata } from "@/pages";
import { api } from "@/utils/api";
import styles from "./index.module.scss";

type Props = {
	publicUrls: UrlWithMetadata[] | undefined;
	userPrivateUrls: UrlWithMetadata[] | undefined;
};

export default function UrlList({ publicUrls = [], userPrivateUrls = [] }: Props) {
	const { data: projectRepoUrl } = api.url.getProjectRepoUrl.useQuery();

	const combinedUrls = [...publicUrls, ...userPrivateUrls];

	const shouldDisplayRepoLink = projectRepoUrl && combinedUrls.length < 4;

	return (
		<ul className={styles["url-list"]}>
			{shouldDisplayRepoLink && (
				<UrlInfoCard
					url={projectRepoUrl}
					isProjectRepo
				/>
			)}
			{combinedUrls.length === 0 && <PlaceholderInfoCard />}
			{userPrivateUrls.length > 0 && (
				<>
					{userPrivateUrls.map((url) => (
						<UrlInfoCard
							key={url.id}
							url={url}
						/>
					))}
				</>
			)}
			{publicUrls.length > 0 && (
				<>
					{publicUrls.map((url) => (
						<UrlInfoCard
							key={url.id}
							url={url}
							isPublic
						/>
					))}
					<PublicLinkNotice />
				</>
			)}
		</ul>
	);
}
