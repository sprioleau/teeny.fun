"use client";

/* eslint-disable @next/next/no-img-element */

import EmojiImage from "../EmojiImage";

import styles from "./index.module.scss";

type Props = {
	qrCodeImageUrl: string;
	code: string;
};

export default function QrCodeModal({ qrCodeImageUrl, code }: Props) {
	return (
		<div className={styles["main"]}>
			<img
				src={qrCodeImageUrl}
				alt="qr-code"
			/>
			<p className={styles["short-url"]}>
				<span>
					{new URL(window.location.href).origin}/{<EmojiImage>{code}</EmojiImage>}
				</span>
			</p>
		</div>
	);
}
