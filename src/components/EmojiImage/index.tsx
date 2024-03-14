// import Twemoji from "react-twemoji";
import styles from "./index.module.scss";

type Props = {
	children: React.ReactNode;
	className?: string;
};

export default function EmojiImage({ children, className }: Props) {
	return (
		<span className={[styles["main"], className].join(" ").trim()}>
			Twemoji
			{/* <Twemoji
				tag="span"
				options={{
					ext: ".svg",
					folder: "svg",
					className: "twemoji",
				}}
			>
				{children}
			</Twemoji> */}
		</span>
	);
}
