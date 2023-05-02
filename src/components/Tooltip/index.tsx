import styles from "./index.module.scss";

type Props = {
	isVisible: boolean;
	children: React.ReactNode;
};

export default function Tooltip({ isVisible, children }: Props) {
	return (
		<div className={[styles["tooltip"], isVisible ? styles["visible"] : ""].join(" ")}>
			{children}
		</div>
	);
}
