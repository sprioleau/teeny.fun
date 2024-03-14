/* eslint-disable @next/next/no-img-element */

// import { type Url } from "@prisma/client/edge";

// import { getBaseUrl } from "@/utils/api";
import styles from "./index.module.scss";
import EmojiImage from "../EmojiImage";

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
					{/* {getBaseUrl()} */}/{<EmojiImage>{code}</EmojiImage>}
				</span>
			</p>
		</div>
	);
}
