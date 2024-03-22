"use client";

import { getPublicUrlsByClientKey } from "@/app/(api)/utils";
import UrlInfoCard from "@/components/UrlInfoCard";
import { DEFAULT_LOCAL_STORE_CLIENT_KEY } from "@/constants";
import { UrlWithMetadata } from "@/db/types";
import { useLocalStorage } from "@/hooks";
import { unstable_noStore as noStore } from "next/cache";
import { useEffect, useState } from "react";
import PublicLinkNotice from "../PublicLinkNotice";

import styles from "./index.module.scss";

export default function PublicUrlList() {
	noStore();
	const [publicUrls, setPublicUrls] = useState<UrlWithMetadata[]>([]);
	const [clientKey] = useLocalStorage<string>(DEFAULT_LOCAL_STORE_CLIENT_KEY, "");

	useEffect(() => {
		if (!clientKey) return;
		getPublicUrlsByClientKey({ clientKey }).then(setPublicUrls);
	}, [clientKey]);

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
