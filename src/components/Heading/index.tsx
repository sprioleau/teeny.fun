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
	children,
	color,
	inline = false,
}: {
	children: string;
	color?: ButtonColor | "white";
	inline?: boolean;
}) {
	return (
		<span
			className={styles.headingSpan}
			style={{ color: color ? `var(--color-${color})` : "inherit" }}
		>
			{children}
			{!inline && <br />}
		</span>
	);
}

Heading.Span = HeadingSpan;

export default Heading;
