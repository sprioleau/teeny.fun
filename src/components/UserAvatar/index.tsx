import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";

import styles from "./index.module.scss";

export default async function UserAvatar() {
	const authenticatedUser = await currentUser();

	if (!authenticatedUser) return null;

	return (
		<div className={styles["user-avatar"]}>
			<Image
				width={24}
				height={24}
				src={authenticatedUser.imageUrl}
				alt={`${authenticatedUser.fullName ?? "user"} avatar`}
			/>
		</div>
	);
}
