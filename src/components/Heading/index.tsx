import React from "react";
import styles from "./index.module.scss";
import { type ButtonColor } from "../Button";

type Props = {
	tag?: "h1" | "h2" | "h3";
	color?: ButtonColor | "white";
} & React.HTMLAttributes<HTMLHeadingElement>;

export default function Heading({ tag: Tag = "h2", color = "white", children }: Props) {
	return (
		<Tag
			className={styles.heading}
			style={{ color: `var(--color-${color})` }}
		>
			{children}
		</Tag>
	);
}
