"use client";

import { createUrl } from "@/actions";
import UrlFormContents from "../UrlFormContents";

import styles from "./index.module.scss";

export default function UrlForm() {
	return (
		<form
			action={createUrl}
			className={styles.form}
		>
			<UrlFormContents />
		</form>
	);
}
