import { type Url } from "@prisma/client";
import { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import useModal from "@/hooks/useModal";
import { api } from "@/utils/api";
import styles from "./index.module.scss";
import Button from "../Button";
import EmojiImage from "../EmojiImage";
import TopEmojisPicker from "../TopEmojisPicker";

type Props = {
	id: Url["id"];
};

export default function EditShortcodeModal({ id }: Props) {
	const [emojiStringArray, setEmojiStringArray] = useState<string[]>([]);
	const { close: closeModal } = useModal();

	const ctx = api.useContext();

	const { mutateAsync: updateCodeById } = api.url.updateCodeById.useMutation({
		onSuccess(_data, _variables, _context) {
			void ctx.url.invalidate();
			closeModal();
		},
		onError(error) {
			if (!error?.shape) return;
			console.error(error);
			alert(error?.shape?.message);
		},
	});

	async function handleSubmit() {
		if (emojiStringArray.length < 3 || emojiStringArray.length >= 6) return;

		await updateCodeById({
			id,
			code: emojiStringArray.join(""),
		});
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
						onClick={() => void handleSubmit()}
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
