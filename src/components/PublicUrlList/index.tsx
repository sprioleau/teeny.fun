import UrlInfoCard from "@/components/UrlInfoCard";
import { PERSISTED_CLIENT_KEY } from "@/constants";
import { db } from "@/db";
import { isNull } from "drizzle-orm/expressions";
import { cookies } from "next/headers";
import PublicLinkNotice from "../PublicLinkNotice";

import styles from "./index.module.scss";

export default async function PublicUrlList() {
	const clientKey = cookies().get(PERSISTED_CLIENT_KEY)?.value;

	if (!clientKey || typeof clientKey !== "string") {
		return null;
	}

	const publicUrls = await db.query.urls.findMany({
		where: (urls, { and, eq }) =>
			and(isNull(urls.userAuthProviderId), eq(urls.clientKey, clientKey)),
		with: {
			metadata: true,
		},
	});

	return (
		<>
			<PublicLinkNotice />
			<ul className={styles["url-list"]}>
				{/* {shouldDisplayRepoLink && (
				<UrlInfoCard
					url={projectRepoUrl}
					isProjectRepo
				/>
			)} */}
				{/* {combinedUrls.length === 0 && <PlaceholderInfoCard />} */}
				{publicUrls.length > 0 && (
					<>
						{publicUrls.map((publicUrl) => (
							<UrlInfoCard
								key={publicUrl.id}
								url={publicUrl}
							/>
						))}
					</>
				)}
			</ul>
		</>
	);
}
