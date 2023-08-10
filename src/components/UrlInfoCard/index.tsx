/* eslint-disable @next/next/no-img-element */

import { type Url } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { BiEditAlt } from "react-icons/bi";
import { FiArrowUpRight, FiBarChart } from "react-icons/fi";
import { HiOutlineClock, HiOutlineTrash, HiQrcode } from "react-icons/hi";
import { TbCopy } from "react-icons/tb";
import useModal from "@/hooks/useModal";
import { type UrlWithMetadata } from "@/pages";
import { copyText, formatQuantityString, generateQRCode, getShortUrl } from "@/utils";
import { api } from "@/utils/api";
import styles from "./index.module.scss";
import Button from "../Button";
import EditShortcodeModal from "../EditShortcodeModal";
import EmojiImage from "../EmojiImage";
import QrCodeModal from "../QrCodeModal";
import Tooltip from "../Tooltip";

type Props = {
	url: UrlWithMetadata;
	style?: React.CSSProperties;
	isPublic?: boolean;
	isProjectRepo?: boolean;
	isPlaceholder?: boolean;
};

export default function UrlInfoCard({
	url: { id, code, metadata, visits, destinationUrl },
	style = {},
	isPublic = false,
	isProjectRepo = false,
	isPlaceholder = false,
}: Props) {
	const fallbackFaviconSource = "/favicon.png";
	const [qrCodeImageUrl, setQRCodeImageUrl] = useState<string | undefined>();
	const [copyTooltipIsVisible, setCopyTooltipIsVisible] = useState(false);

	const { open: openModal } = useModal();
	const { data: session } = useSession();
	const ctx = api.useContext();

	const { mutateAsync: deleteById } = api.url.deleteById.useMutation({
		onSuccess(_data, _variables, _context) {
			void ctx.url.invalidate();
			toast.success("Successfully deleted");
		},
	});

	useEffect(() => {
		if (!qrCodeImageUrl) return;

		openModal(
			<QrCodeModal
				code={code}
				qrCodeImageUrl={qrCodeImageUrl}
			/>
		);
	}, [qrCodeImageUrl, openModal, code]);

	function handleOpenEditShortcodeModal(id: Url["id"]) {
		openModal(<EditShortcodeModal id={id} />);
	}

	async function handleGenerateQRCode(url: string) {
		const qrCode = await generateQRCode({ text: url });
		setQRCodeImageUrl(qrCode);
	}

	const shortUrl = useMemo(() => getShortUrl({ code }), [code]);

	function handleCopyShortUrl() {
		setCopyTooltipIsVisible(true);
		void copyText(shortUrl);
		setTimeout(() => setCopyTooltipIsVisible(false), 1500);
	}

	function handleDeletePrivateUrl() {
		void deleteById({ id });
	}

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
							<Button
								color="yellow"
								title="Edit shortcode"
								icon={<BiEditAlt />}
								onClick={() => handleOpenEditShortcodeModal(id)}
							/>
						)}
						{session && !isProjectRepo && (
							<Button
								color="yellow"
								title="Delete URL"
								icon={<HiOutlineTrash />}
								onClick={handleDeletePrivateUrl}
							/>
						)}
					</div>
				)}
			</footer>
		</li>
	);
}
