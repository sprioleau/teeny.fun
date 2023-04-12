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

function HeadingSpan({ text, color }: { text: string; color?: ButtonColor | "white" }) {
	return (
		<>
			<span className={styles["heading-span"]}>
				<span
					className={styles["heading-span-front"]}
					style={{ color: color ? `var(--color-${color})` : "inherit" }}
				>
					{text}
				</span>
				<span className={styles["heading-span-back"]}>{text}</span>
			</span>
		</>
	);
}

Heading.Span = HeadingSpan;

export default Heading;
