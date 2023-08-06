import { Button, EmojiImage } from "@/components";
import { topEmojis } from "@/constants";

import styles from "./index.module.scss";

type Props = { onEmojiClick: (emoji: string) => void };

export default function TopEmojisPicker({ onEmojiClick }: Props) {
	return (
		<ul className={styles["top-emojis"]}>
			{topEmojis.map((emoji) => (
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
