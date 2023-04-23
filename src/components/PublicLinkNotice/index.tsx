import Link from "next/link";
import styles from "./index.module.scss";

export default function PublicLinkNotice() {
	return (
		<div className={styles["main"]}>
			<p>
				Note: Public links will be automatically-deleted after 30 minutes.{" "}
				<Link href="/auth/signin">Create a free account</Link> to keep your links forever.
			</p>
		</div>
	);
}
