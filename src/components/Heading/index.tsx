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
	// children,
	color,
	inline = false,
}: {
	text: string;
	// children: string;
	color?: ButtonColor | "white";
	inline?: boolean;
}) {
	return (
		<>
			<span
				style={{
					position: "relative",
					display: "inline-block",
					whiteSpace: "nowrap",
				}}
			>
				<span
					className={styles["heading-span-front"]}
					style={{ color: color ? `var(--color-${color})` : "inherit" }}
				>
					{text}
				</span>
				<span className={styles["heading-span-back"]}>{text}</span>
				{!inline && <br />}
			</span>
		</>
	);
}

Heading.Span = HeadingSpan;

export default Heading;
