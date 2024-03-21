"use client";

import { createPrivateUrl } from "@/actions";
import Button from "@/components/Button";
import Tooltip from "@/components/Tooltip";
import { DEFAULT_LOCAL_URLS_KEY } from "@/constants";
import { useLocalStorage } from "@/hooks";
import { SubmitIcon } from "@/icons";
import { ClerkLoaded, SignUpButton as ClerkSignUpButton, SignedOut, useAuth } from "@clerk/nextjs";
import { FiArrowUpRight, FiLink2 } from "react-icons/fi";
import { useRouter } from "next/navigation";

import styles from "./index.module.scss";

export default function UrlForm() {
	const { userId: authenticatedUserId } = useAuth();

	// TODO: Use localforage and make use of IndexedDB
	const [codePointsArray, setCodePointsArray] = useLocalStorage<string[]>(
		DEFAULT_LOCAL_URLS_KEY,
		[]
	);
	const router = useRouter();

	const shouldDisableForm = false;
	// const shouldDisableForm = publicUrls.length >= 4 && !authenticatedUserId;

	async function formSubmitAction(formData: FormData) {
		const newUrl = await createPrivateUrl(formData);

		setCodePointsArray([...new Set([...codePointsArray, newUrl.codePoints])]);

		router.refresh();
	}

	return (
		<form
			action={formSubmitAction}
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
			{/* TODO: Add condition of publicUrls.length >= 4; bring in useQuery to get publicUrls */}
			{/* TODO: Extract to separate component */}
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
						<ClerkLoaded>
							<SignedOut>
								<div className={styles["main"]}>
									<p>Public links will be automatically-deleted after 24 hours. </p>
									<ClerkSignUpButton mode="modal">
										<Button
											color="blue"
											icon={<FiArrowUpRight />}
										>
											Start for free
										</Button>
									</ClerkSignUpButton>
								</div>
							</SignedOut>
						</ClerkLoaded>
					</main>
				</Tooltip>
			)}
		</form>
	);
}
