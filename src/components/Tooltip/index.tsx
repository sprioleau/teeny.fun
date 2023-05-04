import styles from "./index.module.scss";

type Props = {
	isVisible: boolean;
	children: React.ReactNode;
	className?: string;
};

export default function Tooltip({
	isVisible,
	children,
	className = "",
	...rest
}: Props & React.ComponentPropsWithoutRef<"div">) {
	return (
		<div
			{...rest}
			className={[styles["tooltip"], isVisible ? styles["visible"] : "", className].join(" ")}
		>
			{children}
		</div>
	);
}
