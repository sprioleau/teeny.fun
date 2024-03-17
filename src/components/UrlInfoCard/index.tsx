/* eslint-disable @next/next/no-img-element */
"use client";

import { deleteUserUrlById } from "@/actions";
import { UrlWithMetadata } from "@/db/types";
import useModal from "@/hooks/useModal";
import { copyText, formatQuantityString, generateQRCode } from "@/utils";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { BiEditAlt } from "react-icons/bi";
import { FiArrowUpRight, FiBarChart } from "react-icons/fi";
import { HiOutlineClock, HiOutlineTrash, HiQrcode } from "react-icons/hi";
import { TbCopy } from "react-icons/tb";
import Button from "../Button";
import EmojiImage from "../EmojiImage";
import QrCodeModal from "../QrCodeModal";
import Tooltip from "../Tooltip";
import styles from "./index.module.scss";

type Props = {
	url: UrlWithMetadata;
	style?: React.CSSProperties;
	isPublic?: boolean;
	isProjectRepo?: boolean;
	isPlaceholder?: boolean;
};

export default function UrlInfoCard({
	url: { id: urlId, code, metadata, visits, destinationUrl },
	style = {},
	isPublic = false,
	isProjectRepo = false,
	isPlaceholder = false,
}: Props) {
	const fallbackFaviconSource = "/favicon.png";
	const [qrCodeImageUrl, setQRCodeImageUrl] = useState<string | undefined>();
	const [copyTooltipIsVisible, setCopyTooltipIsVisible] = useState(false);
	const [isVisible, setIsVisible] = useState(false);

	const { open: openModal } = useModal();
	const { isLoaded: isAuthLoaded, userId } = useAuth();

	useEffect(() => {
		if (!qrCodeImageUrl) return;

		openModal(
			<QrCodeModal
				code={code}
				qrCodeImageUrl={qrCodeImageUrl}
			/>
		);
	}, [qrCodeImageUrl, openModal, code]);

	// const shortUrl = useMemo(() => getShortUrl({ code }), [code]);
	const shortUrl = "https://short.com";

	if (!isAuthLoaded || !userId) {
		return null;
	}

	function handleCopyShortUrl() {
		setCopyTooltipIsVisible(true);
		copyText(shortUrl);
		setTimeout(() => setCopyTooltipIsVisible(false), 1500);
	}

	async function handleGenerateQRCode(url: string) {
		const qrCode = await generateQRCode({ text: url });
		setQRCodeImageUrl(qrCode);
	}

	// function handleOpenEditShortcodeModal(id: Url["id"]) {
	// 	// console.log("Editing shortcode", id);
	// 	// openModal(<EditShortcodeModal id={id} />);
	// }

	return (
		<li
			className={styles["card"]}
			style={style}
			data-is-project-repo={isProjectRepo}
		>
			<main className={styles["main"]}>
				<div className={styles["main-left"]}>
					<img
						src={metadata?.icon ?? fallbackFaviconSource}
						alt={metadata?.url ? `favicon for ${metadata?.url}` : "favicon"}
						width={32}
						height={32}
						className={styles["favicon"]}
					/>
					<header className={styles["header"]}>
						<Button
							as={"a"}
							className={styles["short-url"]}
							target="_blank"
							href={decodeURIComponent(code)}
							rel="noreferrer"
							color="yellow"
							title="Visit URL"
						>
							teeny.fun/
							<EmojiImage>{code}</EmojiImage>
						</Button>
						{!isPlaceholder && (
							<span className={styles["visits"]}>
								<FiBarChart />{" "}
								{formatQuantityString({ quantity: visits, nouns: ["visit", "visits"] })}
							</span>
						)}
					</header>
				</div>
				{isPublic && (
					<div
						className={styles["public-url-indicator"]}
						title="Public link will expire in 24 hours"
					>
						<HiOutlineClock />
					</div>
				)}
			</main>
			<footer className={styles["footer"]}>
				<span
					className={styles["destination-url"]}
					title={destinationUrl}
				>
					{destinationUrl}
				</span>
				{!isPlaceholder && (
					<div className={styles["action-buttons"]}>
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
						<Button
							className={styles["copy-button"]}
							color="yellow"
							title="Copy shortcode"
							icon={<TbCopy />}
							tooltip={<Tooltip isVisible={copyTooltipIsVisible}>Copied!</Tooltip>}
							onClick={handleCopyShortUrl}
						/>
						<Button
							color="yellow"
							title="View QR code"
							icon={<HiQrcode />}
							onClick={() => {
								setQRCodeImageUrl(undefined);
								void handleGenerateQRCode(shortUrl);
							}}
						/>
						{!isProjectRepo && (
							// <form action={editUserUrlById}>
							// 	<input
							// 		type="hidden"
							// 		hidden
							// 		aria-hidden
							// 		name="url-id"
							// 		value={urlId}
							// 	/>
							// 	<input
							// 		type="hidden"
							// 		hidden
							// 		aria-hidden
							// 		name="code"
							// 		value={urlId}
							// 	/>
							// 	<Button
							// 		color="yellow"
							// 		title="Edit shortcode"
							// 		icon={<BiEditAlt />}
							// 		type="submit"
							// 	/>
							// </form>
							<Button
								color="yellow"
								title="Edit shortcode"
								icon={<BiEditAlt />}
								onClick={() => {
									console.log("Edit shortcode");

									setIsVisible(!isVisible);

									// openModal(
									// 	<p>
									// 		Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci non
									// 		repellendus quia mollitia dolor, at aut ad unde exercitationem explicabo!
									// 	</p>
									// );
								}}
								// type="submit"
							/>
						)}
						{userId && !isProjectRepo && (
							<form action={deleteUserUrlById}>
								<input
									type="hidden"
									hidden
									aria-hidden
									name="url-id"
									value={urlId}
								/>
								<Button
									color="yellow"
									title="Delete URL"
									icon={<HiOutlineTrash />}
									type="submit"
								/>
							</form>
						)}
					</div>
				)}
				{/* {isVisible && <EditShortcodeModal id={urlId} />} */}
			</footer>
		</li>
	);
}
