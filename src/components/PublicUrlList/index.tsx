"use client";

import { getPublicUrlsByCodePoints } from "@/app/api/utils";
import UrlInfoCard from "@/components/UrlInfoCard";
import { DEFAULT_LOCAL_URLS_KEY } from "@/constants";
import { UrlWithMetadata } from "@/db/types";
import { useLocalStorage } from "@/hooks";
import { useEffect, useState } from "react";
import PublicLinkNotice from "../PublicLinkNotice";

import styles from "./index.module.scss";

export default function PublicUrlList() {
	const [publicUrls, setPublicUrls] = useState<UrlWithMetadata[]>([]);
	const [codePointsArray] = useLocalStorage<string[]>(DEFAULT_LOCAL_URLS_KEY, []);

	useEffect(() => {
		if (codePointsArray.length === 0) return;
		getPublicUrlsByCodePoints({ codePointsArray }).then(setPublicUrls);
	}, [codePointsArray]);

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
