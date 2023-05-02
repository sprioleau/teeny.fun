import FocusTrap from "focus-trap-react";
import { useContext, useEffect } from "react";
import { MdOutlineClose } from "react-icons/md";

import { ModalContext } from "@/contexts/ModalContextProvider";

import styles from "./index.module.scss";
import Button from "../Button";

export default function Modal() {
	const { close: closeModal, modalContent } = useContext(ModalContext);

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
