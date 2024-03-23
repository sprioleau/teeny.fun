import UrlInfoCard from "@/components/UrlInfoCard";
import { PERSISTED_CLIENT_KEY } from "@/constants";
import { db } from "@/db";
import { UrlWithMetadata } from "@/db/types";
import { currentUser } from "@clerk/nextjs/server";
import { isNull } from "drizzle-orm";
import { unstable_noStore as noStore } from "next/cache";
import { cookies } from "next/headers";

import styles from "./index.module.scss";

export default async function UrlList() {
	noStore();
	const authenticatedUser = await currentUser();

	if (!authenticatedUser) return null;

	let urls: UrlWithMetadata[] = [];

	const clientKey = cookies().get(PERSISTED_CLIENT_KEY)?.value ?? "";

	urls = await db.query.urls.findMany({
		where: (urls, { eq, and }) =>
			and(
				authenticatedUser.id
					? eq(urls.userAuthProviderId, authenticatedUser.id)
					: isNull(urls.userAuthProviderId),
				eq(urls.clientKey, clientKey)
			),
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
