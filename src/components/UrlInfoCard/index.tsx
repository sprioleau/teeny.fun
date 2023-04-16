/* eslint-disable @next/next/no-img-element */

import Button from "../Button";
import { HiQrcode } from "react-icons/hi";
import { TbCopy } from "react-icons/tb";
import { FiArrowUpRight, FiBarChart } from "react-icons/fi";
import styles from "./index.module.scss";
import { type UrlWithMetadata } from "~/pages";
import { copyText, getShortUrl } from "~/utils";

type Props = {
	url: UrlWithMetadata;
};

export default function UrlInfoCard({ url }: Props) {
	const fallbackFaviconSource = "/_static/images/emojis/fire.svg";

	function formatVisits(visits: number) {
		let unit = "visit";
		if (visits === 1) return `1 ${unit}`;

		unit = "visits";
		if (visits < 1_000) {
			return `${visits} ${unit}`;
		} else if (visits < 1_000_000) {
			return `${(visits / 1_000).toFixed(1)}K ${unit}`;
		} else {
			return `${(visits / 1_000_000).toFixed(1)}M ${unit}`;
		}
	}

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
					<header className={styles["header"]}>
						<span className={styles["short-url"]}>teeny.fun/{url.code}</span>
						<span className={styles["visits"]}>
							<FiBarChart /> {formatVisits(url.visits)}
						</span>
					</header>
				</div>
			</main>
			<footer className={styles["footer"]}>
				<span className={styles["destination-url"]}>{url.destinationUrl}</span>
				<div className={styles["action-buttons"]}>
					<Button
						color="yellow"
						title="Copy shortcode"
						icon={<TbCopy />}
						onClick={() => void copyText(getShortUrl({ code: url.code }))}
					></Button>
					<Button
						color="yellow"
						title="View QR code"
						icon={<HiQrcode />}
					></Button>
					<Button
						as={"a"}
						className={styles["visit-button"]}
						target="_blank"
						href={url.code}
						rel="noreferrer"
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
