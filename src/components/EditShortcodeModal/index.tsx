"use client";

import { updateShortcodeById } from "@/actions";
import Button from "@/components/Button";
import EmojiImage from "@/components/EmojiImage";
import TopEmojisPicker from "@/components/TopEmojisPicker";
import type { Url } from "@/db/types";
import useModal from "@/hooks/useModal";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { FiArrowLeft } from "react-icons/fi";

import styles from "./index.module.scss";

type Props = {
	id: Url["id"];
};

export default function EditShortcodeModal({ id: urlId }: Props) {
	const [emojiStringArray, setEmojiStringArray] = useState<string[]>([]);
	const { close: closeModal } = useModal();

	const { pending: isFormPending } = useFormStatus();

	async function handleSubmit(formData: FormData) {
		if (emojiStringArray.length < 3 || emojiStringArray.length > 6) return;

		try {
			await updateShortcodeById(formData);
			setEmojiStringArray([]);
			closeModal();
			console.log("Shortcode updated");
		} catch (caughtError) {
			// TODO: Handle error
			console.error(caughtError);
		}
	}

	function handleRemoveEmoji() {
		if (emojiStringArray.length === 0) return;
		setEmojiStringArray((previous) => previous.slice(0, -1));
	}

	function handleAddEmoji(emoji: string) {
		if (emojiStringArray.length >= 6) return;
		setEmojiStringArray((previous) => [...previous, emoji]);
	}

	return (
		<div className={styles["main"]}>
			<form
				className={styles["form"]}
				action={handleSubmit}
			>
				<div className={styles["emoji-string-display"]}>
					{emojiStringArray.length === 0 && <p>Select 3-6 emojis</p>}
					{emojiStringArray.map((emoji, index) => (
						<EmojiImage
							key={`${emoji}-${index}`}
							className={styles["emoji-string"]}
						>
							{emoji}
						</EmojiImage>
					))}
				</div>
				<div className={styles["action-buttons"]}>
					{emojiStringArray.length > 0 && (
						<Button
							onClick={handleRemoveEmoji}
							color="blue"
						>
							<FiArrowLeft />
						</Button>
					)}
					<input
						type="hidden"
						hidden
						aria-hidden
						value={urlId}
						name="url-id"
					/>
					<input
						type="hidden"
						hidden
						aria-hidden
						value={emojiStringArray.join("")}
						name="code"
					/>
					<Button
						type="submit"
						disabled={emojiStringArray.length < 3 || isFormPending}
					>
						Submit
					</Button>
				</div>
			</form>
			<div className={styles["top-emojis-picker"]}>
				<TopEmojisPicker onEmojiClick={handleAddEmoji} />
			</div>
		</div>
	);
}
