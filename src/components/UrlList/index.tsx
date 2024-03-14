import { PlaceholderInfoCard, PublicLinkNotice, UrlInfoCard } from "@/components";
import { db } from "@/db";
import { auth } from "@clerk/nextjs/server";

import styles from "./index.module.scss";

// type Props = {
// 	publicUrls: any[] | undefined; //UrlWithMetadata[] | undefined;
// 	userPrivateUrls: any[] | undefined; //UrlWithMetadata[] | undefined;
// };

export default async function UrlList() {
	const { userId: authenticatedUserId } = auth();

	if (!authenticatedUserId) return null;

	const urls = await db.query.urls.findMany({
		where: (urls, { eq }) => eq(urls.userAuthProviderId, authenticatedUserId),
		with: {
			metadata: true,
		},
	});

	// const { data: projectRepoUrl } = api.url.getProjectRepoUrl.useQuery();

	// const combinedUrls = [...publicUrls, ...userPrivateUrls];

	// const shouldDisplayRepoLink = projectRepoUrl && combinedUrls.length < 4;

	return (
		<ul className={styles["url-list"]}>
			<li>
				<p>URLs</p>
			</li>
			{/* {shouldDisplayRepoLink && (
				<UrlInfoCard
					url={projectRepoUrl}
					isProjectRepo
				/>
			)} */}
			{/* {combinedUrls.length === 0 && <PlaceholderInfoCard />} */}
			{urls?.length > 0 && (
				<>
					{urls.map((url) => (
						<UrlInfoCard
							key={url.id}
							url={url}
						/>
					))}
				</>
			)}
			{/* {publicUrls.length > 0 && (
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
			)} */}
		</ul>
	);
}
