import { createUrl } from "@/actions";
import { Button, Tooltip } from "@/components";
import { SubmitIcon } from "@/icons";
import { auth } from "@clerk/nextjs/server";
import { FiArrowUpRight, FiLink2 } from "react-icons/fi";

import styles from "./index.module.scss";

export default function UrlForm() {
	const { userId: authenticatedUserId } = auth();

	const shouldDisableForm = false;
	// const shouldDisableForm = localUrls.length >= 4 && !session;

	return (
		<form
			action={createUrl}
			className={styles.form}
		>
			<span className={styles["link-icon"]}>
				<FiLink2 />
			</span>
			<label
				htmlFor="destination-url"
				className={styles.label}
			>
				Long URL
			</label>
			<input
				type="text"
				id="destination-url"
				name="destination-url"
				className={styles.input}
				required
				disabled={shouldDisableForm}
				placeholder="Paste in your link"
			/>
			<Button
				type="submit"
				title="Submit"
				className={styles["submit-button"]}
				icon={<SubmitIcon />}
			/>
			{!Boolean(authenticatedUserId) && (
				<Tooltip
					className={styles["tooltip"]}
					isVisible={shouldDisableForm}
				>
					<main className={styles["tooltip-main"]}>
						<p>
							Maximum number of links reached. Either delete existing links or create a free
							account.
						</p>
						<Button
							color="blue"
							href="/auth/signin"
							icon={<FiArrowUpRight />}
						>
							start for free
						</Button>
					</main>
				</Tooltip>
			)}
		</form>
	);
}
