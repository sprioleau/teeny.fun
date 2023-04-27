import { type Url } from "@prisma/client";
import { FiLink2 } from "react-icons/fi";
import { Button } from "~/components";
import { SubmitIcon } from "~/icons";
import styles from "./index.module.scss";

type Props = {
	destinationUrl: Url["destinationUrl"];
	setDestinationUrl: React.Dispatch<React.SetStateAction<Url["destinationUrl"]>>;
	disabled: boolean;
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
};

export default function UrlForm({ onSubmit, disabled, destinationUrl, setDestinationUrl }: Props) {
	return (
		<form
			onSubmit={(e) => void onSubmit(e)}
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
				disabled={disabled}
				placeholder="Paste in your link"
				value={destinationUrl}
				onChange={(e) => setDestinationUrl(e.target.value)}
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
