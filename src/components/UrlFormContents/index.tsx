"use client";

import { DEFAULT_LOCAL_STORE_CLIENT_KEY } from "@/constants";
import { SubmitIcon } from "@/icons";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { FiLink2 } from "react-icons/fi";
import Button from "../Button";
import LoadingIcon from "../LoadingIcon";

import styles from "./index.module.scss";

export default function UrlFormContents() {
	const { userId: authenticatedUserId } = useAuth();
	const [clientKey, setClientKey] = useState("");
	const { pending: isPending } = useFormStatus();

	const shouldDisableForm = isPending;
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
		<>
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
				icon={isPending ? <LoadingIcon /> : <SubmitIcon />}
			/>
		</>
	);
}
