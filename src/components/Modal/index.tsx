"use client";

import FocusTrap from "focus-trap-react";
import useModal from "@/hooks/useModal";
import { useEffect } from "react";
import { MdOutlineClose } from "react-icons/md";
import Button from "../Button";

import styles from "./index.module.scss";

type Props = {
	isAuthenticated: boolean;
};

export default function Modal({ isAuthenticated }: Props) {
	const { close: closeModal, modalContent } = useModal();

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key !== "Escape") return;
			closeModal();
		};

		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [closeModal]);

	if (!modalContent) return null;

	return (
		<FocusTrap>
			<div
				className={styles["backdrop"]}
				data-is-authenticated={isAuthenticated}
				onClick={closeModal}
			>
				<div
					className={styles["modal"]}
					onClick={(e) => e.stopPropagation()}
				>
					{modalContent}
					<Button
						className={styles["close-button"]}
						onClick={closeModal}
					>
						<MdOutlineClose />
					</Button>
				</div>
			</div>
		</FocusTrap>
	);
}
