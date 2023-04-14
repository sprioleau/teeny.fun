import React from "react";
import styles from "./index.module.scss";
import { type ButtonColor } from "../Button";

type Props = {
	tag?: "h1" | "h2" | "h3";
	color?: ButtonColor | "white";
} & React.HTMLAttributes<HTMLHeadingElement>;

function Heading({ tag: Tag = "h2", color, children }: Props) {
	return (
		<Tag
			className={styles.heading}
			style={{ color: color ? `var(--color-${color})` : "inherit" }}
		>
			{children}
		</Tag>
	);
}

function HeadingSpan({
	text,
	index,
	color,
}: {
	text: string;
	index: number;
	color?: ButtonColor | "white";
}) {
	return (
		<>
			<span className={styles["heading-span"]}>
				<span
					className={styles["heading-span-front"]}
					style={{ color: color ? `var(--color-${color})` : "inherit", zIndex: index * 2 + 1 }}
				>
					{text}
				</span>
				<span
					className={styles["heading-span-back"]}
					style={{ zIndex: index * 2 }}
				>
					{text}
				</span>
			</span>
		</>
	);
}

Heading.Span = HeadingSpan;

export default Heading;
