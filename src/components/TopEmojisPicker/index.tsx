import Button from "@/components/Button";
import EmojiImage from "@/components/EmojiImage";
import { TOP_EMOJIS } from "@/constants";

import styles from "./index.module.scss";

type Props = { onEmojiClick: (emoji: string) => void };

export default function TopEmojisPicker({ onEmojiClick }: Props) {
	return (
		<ul className={styles["top-emojis"]}>
			{TOP_EMOJIS.map((emoji) => (
				<li key={emoji}>
					<Button
						className={styles["top-emoji-button"]}
						onClick={() => onEmojiClick(emoji)}
						color="pink"
					>
						<EmojiImage>{emoji}</EmojiImage>
					</Button>
				</li>
			))}
		</ul>
	);
}
