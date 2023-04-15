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
} & React.ComponentPropsWithoutRef<"button"> &
	React.ComponentPropsWithoutRef<"a">;

const variantProps: Record<
	ButtonColor,
	{
		color: string;
		backgroundColor: string;
	}
> = {
	pink: {
		color: "var(--color-white)",
		backgroundColor: "var(--color-pink)",
	},
	yellow: {
		color: "var(--color-border)",
		backgroundColor: "var(--color-yellow)",
	},
	blue: {
		color: "var(--color-white)",
		backgroundColor: "var(--color-blue)",
	},
};

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
	children,
	...rest
}: Props) {
	const additionalAttributes = href ? externalLinkAttributes : {};

	if (href?.startsWith("/")) {
		return (
			<Link
				href={href}
				className={[styles.button, className].join(" ")}
				style={{
					...variantProps[color],
				}}
			>
				{icon && <span className={styles.icon}>{icon}</span>}
				{children}
			</Link>
		);
	}

	return (
		<Tag
			href={href}
			className={[styles.button, className].join(" ")}
			style={{
				...variantProps[color],
			}}
			{...additionalAttributes}
			{...rest}
		>
			{icon && <span className={styles.icon}>{icon}</span>}
			{children}
		</Tag>
	);
}
