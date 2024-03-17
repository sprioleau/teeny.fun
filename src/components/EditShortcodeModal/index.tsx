"use client";

// import type { Url } from "@/db/types";
// import useModal from "@/hooks/useModal";
import { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { Button, EmojiImage, TopEmojisPicker } from "@/components";

import styles from "./index.module.scss";

// type Props = {
// 	id: Url["id"];
// };

export default function EditShortcodeModal({ id }: any) {
	const [emojiStringArray, setEmojiStringArray] = useState<string[]>([]);
	// const { close: closeModal } = useModal();

	// const ctx = api.useContext();

	// const { mutateAsync: updateCodeById } = api.url.updateCodeById.useMutation({
	// 	onSuccess(_data, _variables, _context) {
	// 		void ctx.url.invalidate();
	// 		toast.success("Successfully updated");
	// 		closeModal();
	// 	},
	// 	onError(error) {
	// 		if (!error?.shape) return;
	// 		toast.error(error.message);
	// 	},
	// });

	// async function handleSubmit() {
	// 	if (emojiStringArray.length < 3 || emojiStringArray.length >= 6) return;

	// 	await updateCodeById({
	// 		id,
	// 		code: emojiStringArray.join(""),
	// 	});
	// }

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
			<div className={styles["form"]}>
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
					<Button
						// onClick={() => void handleSubmit()}
						disabled={emojiStringArray.length < 3}
					>
						Submit
					</Button>
				</div>
			</div>
			<div className={styles["top-emojis-picker"]}>
				<TopEmojisPicker onEmojiClick={handleAddEmoji} />
			</div>
		</div>
	);
}
