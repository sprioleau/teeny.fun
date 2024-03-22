"use client";

import { createUrl } from "@/actions";
import Button from "@/components/Button";
import Tooltip from "@/components/Tooltip";
import { DEFAULT_LOCAL_STORE_CLIENT_KEY } from "@/constants";
import { SubmitIcon } from "@/icons";
import { ClerkLoaded, SignUpButton as ClerkSignUpButton, SignedOut, useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { FiArrowUpRight, FiLink2 } from "react-icons/fi";

import styles from "./index.module.scss";

export default function UrlForm() {
	const { userId: authenticatedUserId } = useAuth();
	const [clientKey, setClientKey] = useState("");

	const shouldDisableForm = false;
	// const shouldDisableForm = publicUrls.length >= 4 && !authenticatedUserId;

	useEffect(() => {
		let persistedClientKey = localStorage.getItem(DEFAULT_LOCAL_STORE_CLIENT_KEY);

		if (
			(typeof persistedClientKey === "string" && persistedClientKey.length > 0) ||
			authenticatedUserId
		) {
			setClientKey(persistedClientKey as string);
			return;
		}

		// Presist a new client key
		const newClientKey = crypto.randomUUID();
		localStorage.setItem(DEFAULT_LOCAL_STORE_CLIENT_KEY, newClientKey);

		// Add new client key to state
		setClientKey(newClientKey);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

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
				type="hidden"
				name="clientKey"
				value={clientKey}
				aria-hidden="true"
			/>
			<input
				type="text"
				id="destination-url"
				name="destination-url"
				className={styles.input}
				required
				disabled={shouldDisableForm}
				placeholder="Paste in your link"
				inputMode="url"
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
