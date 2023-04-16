/* eslint-disable @next/next/no-img-element */

import Button from "../Button";
import { HiQrcode } from "react-icons/hi";
import { TbCopy } from "react-icons/tb";
import { FiArrowUpRight, FiBarChart } from "react-icons/fi";
import styles from "./index.module.scss";
import { type UrlWithMetadata } from "~/pages";
import { copyText, formatQuantityString, generateQRCode, getShortUrl } from "~/utils";
import { useMemo, useState } from "react";

type Props = {
	url: UrlWithMetadata;
};

export default function UrlInfoCard({ url: { code, metadata, visits, destinationUrl } }: Props) {
	const fallbackFaviconSource = "/_static/images/emojis/fire.svg";
	const [qrCodeImageUrl, setQRCodeImageUrl] = useState<string | undefined>();

	async function handleGenerateQRCode(url: string) {
		const qrCode = await generateQRCode({ text: url });
		setQRCodeImageUrl(qrCode);
	}

	const shortUrl = useMemo(() => getShortUrl({ code }), [code]);

	return (
		<li className={styles["card"]}>
			<main className={styles["main"]}>
				<div className={styles["main-left"]}>
					<img
						src={metadata?.icon ?? fallbackFaviconSource}
						alt="Fire emoji"
						width={32}
						height={32}
						className={styles["favicon"]}
					/>
					{qrCodeImageUrl && (
						<img
							src={qrCodeImageUrl}
							alt="qr-code"
						/>
					)}
					<header className={styles["header"]}>
						<Button
							as={"a"}
							className={styles["short-url"]}
							target="_blank"
							href={code}
							rel="noreferrer"
							color="yellow"
							title="Visit URL"
						>
							teeny.fun/{code}
						</Button>
						<span className={styles["visits"]}>
							<FiBarChart />{" "}
							{formatQuantityString({ quantity: visits, nouns: ["visit", "visits"] })}
						</span>
					</header>
				</div>
			</main>
			<footer className={styles["footer"]}>
				<span className={styles["destination-url"]}>{destinationUrl}</span>
				<div className={styles["action-buttons"]}>
					<Button
						color="yellow"
						title="Copy shortcode"
						icon={<TbCopy />}
						onClick={() => void copyText(shortUrl)}
					></Button>
					<Button
						color="yellow"
						title="View QR code"
						icon={<HiQrcode />}
						onClick={() => void handleGenerateQRCode(shortUrl)}
					></Button>
					<Button
						as={"a"}
						className={styles["visit-button"]}
						target="_blank"
						href={code}
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
