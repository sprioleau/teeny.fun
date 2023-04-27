import { type Url } from "@prisma/client";
import { FiLink2 } from "react-icons/fi";
import { Button } from "~/components";
import { SubmitIcon } from "~/icons";
import styles from "./index.module.scss";

type Props = {
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
	destinationUrl: Url["destinationUrl"];
	setDestinationUrl: React.Dispatch<React.SetStateAction<Url["destinationUrl"]>>;
};

export default function UrlForm({ onSubmit, destinationUrl, setDestinationUrl }: Props) {
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
