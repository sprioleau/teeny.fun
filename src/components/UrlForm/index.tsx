import { type Url } from "@prisma/client";
import { useState } from "react";
import { FiArrowUpRight, FiLink2 } from "react-icons/fi";
import { Button, Tooltip } from "@/components";
import { SubmitIcon } from "@/icons";
import styles from "./index.module.scss";

type Props = {
	destinationUrl: Url["destinationUrl"];
	setDestinationUrl: React.Dispatch<React.SetStateAction<Url["destinationUrl"]>>;
	disabled: boolean;
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
};

export default function UrlForm({ onSubmit, disabled, destinationUrl, setDestinationUrl }: Props) {
	const [formIsHovered, setFormIsHovered] = useState(false);

	return (
		<form
			onSubmit={(e) => void onSubmit(e)}
			className={styles.form}
			onMouseEnter={() => setFormIsHovered(true)}
			onMouseLeave={() => setFormIsHovered(false)}
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
			<Tooltip isVisible={disabled && formIsHovered}>
				<>
					<p>
						Maximum number of links reached. Either delete existing links or create a free account.
					</p>
					<Button
						color="blue"
						href="/auth/signin"
						icon={<FiArrowUpRight />}
					>
						start for free
					</Button>
				</>
			</Tooltip>
		</form>
	);
}
