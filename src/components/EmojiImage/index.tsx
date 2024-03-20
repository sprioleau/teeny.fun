import Twemoji from "react-twemoji";

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
