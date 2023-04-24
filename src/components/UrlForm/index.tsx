import { useState } from "react";
import { FiLink2 } from "react-icons/fi";
import { Button } from "~/components";
import { SubmitIcon } from "~/icons";
import { api } from "~/utils/api";
import styles from "./index.module.scss";

export default function UrlForm() {
	const [destinationUrl, setDestinationUrl] = useState("");

	const ctx = api.useContext();

	const { mutateAsync: createUrl } = api.url.create.useMutation({
		onSuccess: (data) => {
			void ctx.url.getByUserId.invalidate();
			console.log("🚀 ~ file: index.tsx:22 ~ onSuccess: ~ data", data);
		},
		onError(error, variables, _context) {
			console.error(
				`Error: ${error.message} \n\n Variables: ${JSON.stringify(variables, null, 2)}`
			);
		},
	});

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		try {
			const newUrl = await createUrl({ destinationUrl });
			console.log("🚀 ~ file: index.tsx:29 ~ handleSubmit ~ newUrl:", newUrl);
		} catch (error) {
			console.error(error);
		}

		setDestinationUrl("");
	}

	return (
		<form
			onSubmit={(e) => void handleSubmit(e)}
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
