/* eslint-disable @next/next/no-img-element */
import Button from "../Button";
import { HiQrcode } from "react-icons/hi";
import { TbCopy } from "react-icons/tb";
import { FiArrowUpRight } from "react-icons/fi";
import styles from "./index.module.scss";
import { type UrlWithMetadata } from "~/pages";

type Props = {
	url: UrlWithMetadata;
};

export default function UrlInfoCard({ url }: Props) {
	const fallbackFaviconSource = "/_static/images/emojis/fire.svg";

	return (
		<li className={styles["card"]}>
			<main className={styles["main"]}>
				<div className={styles["main-left"]}>
					<img
						src={url?.metadata?.icon ?? fallbackFaviconSource}
						alt="Fire emoji"
						width={32}
						height={32}
						className={styles["favicon"]}
					/>
					<span className={styles["short-url"]}>teeny.fun/{url.code}</span>
				</div>
				<div className={styles["main-right"]}>
					<span className={styles["visits"]}>{url.visits} visits</span>
				</div>
			</main>
			<footer className={styles["footer"]}>
				<span className={styles["destination-url"]}>{url.destinationUrl}</span>
				<div className={styles["action-buttons"]}>
					<Button
						color="yellow"
						title="Copy shortcode"
						icon={<TbCopy />}
					></Button>
					<Button
						color="yellow"
						title="View QR code"
						icon={<HiQrcode />}
					></Button>
					<Button
						className={styles["visit-button"]}
						color="yellow"
						title="Visit URL"
						icon={<FiArrowUpRight />}
					>
						Visit
					</Button>
				</div>
			</footer>
		</li>
	);
}
