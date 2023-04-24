/* eslint-disable @next/next/no-img-element */

import { useContext, useMemo, useState } from "react";
import { FiArrowUpRight, FiBarChart } from "react-icons/fi";
import { HiQrcode } from "react-icons/hi";
import { TbCopy } from "react-icons/tb";
import Twemoji from "react-twemoji";
import { ModalContext } from "~/contexts/ModalContextProvider";
import { type UrlWithMetadata } from "~/pages";
import { copyText, formatQuantityString, generateQRCode, getShortUrl } from "~/utils";
import styles from "./index.module.scss";
import Button from "../Button";

type Props = {
	url: UrlWithMetadata;
};

export default function UrlInfoCard({ url: { code, metadata, visits, destinationUrl } }: Props) {
	const fallbackFaviconSource = "/_static/images/emojis/fire.svg";
	const [qrCodeImageUrl, setQRCodeImageUrl] = useState<string | undefined>();

	const { open: openModal } = useContext(ModalContext);

	async function handleGenerateQRCode(url: string) {
		const qrCode = await generateQRCode({ text: url });
		setQRCodeImageUrl(qrCode);
		openModal(
			<img
				src={qrCodeImageUrl}
				alt="qr-code"
			/>
		);
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
							teeny.fun/
							<Twemoji
								tag="span"
								options={{
									ext: ".svg",
									folder: "svg",
									className: "twemoji",
								}}
							>
								{code}
							</Twemoji>
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
					/>
					<Button
						color="yellow"
						title="View QR code"
						icon={<HiQrcode />}
						onClick={() => void handleGenerateQRCode(shortUrl)}
					/>
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
