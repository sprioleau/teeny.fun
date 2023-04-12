import { Button } from "~/components";
import { FiLink2 } from "react-icons/fi";
import { SubmitIcon } from "~/icons";
import styles from "./index.module.scss";
import { useState } from "react";

type Props = {
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export default function UrlForm({ onSubmit }: Props) {
	const [longUrl, setLongUrl] = useState("");

	return (
		<form
			onSubmit={onSubmit}
			className={styles.form}
		>
			<span className={styles["link-icon"]}>
				<FiLink2 />
			</span>
			<label
				htmlFor="long-url"
				className={styles.label}
			>
				Long URL
			</label>
			<input
				type="text"
				id="long-url"
				name="long-url"
				className={styles.input}
				required
				placeholder="Enter a URL"
				value={longUrl}
				onChange={(e) => setLongUrl(e.target.value)}
			/>
			<Button
				type="submit"
				title="Submit"
				className={styles["submit-button"]}
				icon={<SubmitIcon />}
			/>
		</form>
	);
}
