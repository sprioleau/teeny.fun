import Twemoji from "react-twemoji";
import styles from "./index.module.scss";

type Props = { children: React.ReactNode };

export default function EmojiImage({ children }: Props) {
	return (
		<span className={styles["main"]}>
			<Twemoji
				tag="span"
				options={{
					ext: ".svg",
					folder: "svg",
					className: "twemoji",
				}}
			>
				{children}
			</Twemoji>
		</span>
	);
}
