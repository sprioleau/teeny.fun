import Image from "next/image";
import { useSession } from "next-auth/react";

import styles from "./index.module.scss";

export default function UserAvatar() {
	const { data: session } = useSession();

	const imageSrc = session?.user.image;

	if (!imageSrc) return null;

	return (
		<div className={styles["user-avatar"]}>
			<Image
				width={24}
				height={24}
				src={imageSrc}
				alt={`${session?.user.name ?? "user"} avatar`}
			/>
		</div>
	);
}
