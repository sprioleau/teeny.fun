import { emojiToCodePoints } from "@/utils";
import Image from "next/image";
import styles from "./index.module.scss";

type Props = {
	children: string;
	className?: string;
};

export default function EmojiImage({ children, className }: Props) {
	if (!children || typeof children !== "string") return null;

	return (
		<span className={[styles["main"], className].join(" ").trim()}>
			{emojiToCodePoints(children)
				.split(" ")
				.map((codePoints, index) => (
					<Image
						key={`${codePoints}-${index}`}
						src={`https://cdn.jsdelivr.net/npm/@twemoji/svg@latest/${codePoints}.svg`}
						alt={`${codePoints} emoji`}
						width={24}
						height={24}
					/>
				))}
		</span>
	);
}
