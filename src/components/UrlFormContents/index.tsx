"use client";

import { SubmitIcon } from "@/icons";
import { useFormStatus } from "react-dom";
import { FiLink2 } from "react-icons/fi";
import Button from "../Button";
import LoadingIcon from "../LoadingIcon";

import styles from "./index.module.scss";

export default function UrlFormContents() {
	const { pending: isPending } = useFormStatus();

	const shouldDisableForm = isPending;

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
