import Link from "next/link";
import type { ReactNode } from "react";

import styles from "./index.module.scss";

export type ButtonColor = "yellow" | "pink" | "blue";

type Props = {
	as?: "button" | "a";
	href?: string;
	icon?: ReactNode;
	color?: ButtonColor;
	nextLink?: boolean;
	tooltip?: JSX.Element;
} & React.ComponentPropsWithoutRef<"button"> &
	React.ComponentPropsWithoutRef<"a">;

const externalLinkAttributes: Pick<React.ComponentPropsWithoutRef<"a">, "target" | "rel"> = {
	target: "_blank",
	rel: "noopener noreferrer",
};

export default function Button({
	as: Tag = "button",
	href,
	icon,
	color = "pink",
	className,
	tooltip,
	children,
	...rest
}: Props) {
	const additionalAttributes = href ? externalLinkAttributes : {};

	if (href?.startsWith("/")) {
		return (
			<Link
				href={href}
				className={[styles.button, className, color].join(" ").trim()}
			>
				{icon && <span className={styles.icon}>{icon}</span>}
				{children}
				{tooltip && tooltip}
			</Link>
		);
	}

	return (
		<Tag
			href={href}
			className={[styles.button, className, color, tooltip ? styles["tooltip-button"] : ""]
				.join(" ")
				.trim()}
			{...additionalAttributes}
			{...rest}
		>
			{icon && <span className={styles.icon}>{icon}</span>}
			{Tag === "a" ? (
				<>
					<span style={{ display: "flex", alignItems: "baseline" }}>{children}</span>
				</>
			) : (
				<>{children}</>
			)}
			{tooltip && tooltip}
		</Tag>
	);
}
