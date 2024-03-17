import { UrlInfoCard } from "@/components";
import { db } from "@/db";
import { currentUser } from "@clerk/nextjs/server";

import styles from "./index.module.scss";

export default async function UrlList() {
	const authenticatedUser = await currentUser();

	if (!authenticatedUser) return null;

	const urls = await db.query.urls.findMany({
		where: (urls, { eq }) => eq(urls.userAuthProviderId, authenticatedUser.id),
		with: {
			metadata: true,
		},
	});

	return (
		<ul className={styles["url-list"]}>
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
