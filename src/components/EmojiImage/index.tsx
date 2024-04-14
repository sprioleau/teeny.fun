import { Twemoji } from "react-emoji-render";

import styles from "./index.module.scss";

type Props = {
	children: string;
	className?: string;
};

export default function EmojiImage({ children, className }: Props) {
	if (!children || typeof children !== "string") return null;

	return (
		<span className={[styles["main"], className].join(" ").trim()}>
			<Twemoji
				text={children}
				options={{
					protocol: "https",
					ext: "svg",
				}}
				svg
			/>
		</span>
	);
}
