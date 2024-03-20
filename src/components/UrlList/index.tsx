import UrlInfoCard from "@/components/UrlInfoCard";
import { db } from "@/db";
import { currentUser } from "@clerk/nextjs/server";

import styles from "./index.module.scss";
import { Url } from "@/db/types";
import { inArray, isNull } from "drizzle-orm";

export default async function UrlList() {
	const authenticatedUser = await currentUser();

	if (!authenticatedUser) return null;

	let urls: Url[] = [];

	if (authenticatedUser.id) {
		urls = await db.query.urls.findMany({
			where: (urls, { eq }) => eq(urls.userAuthProviderId, authenticatedUser.id),
			with: {
				metadata: true,
			},
		});
	} else {
		urls = await db.query.urls.findMany({
			// TODO: finish
			where: (urls, { eq, and, or }) => and(isNull(urls.userId), inArray(urls.codePoints, [":"])),
			with: {
				metadata: true,
			},
		});
	}
	// const urls = await db.query.urls.findMany({
	// 	where: (urls, { eq }) => eq(urls.userAuthProviderId, authenticatedUser.id),
	// 	with: {
	// 		metadata: true,
	// 	},
	// });

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
