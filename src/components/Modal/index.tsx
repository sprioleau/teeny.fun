import FocusTrap from "focus-trap-react";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { MdOutlineClose } from "react-icons/md";
import useModal from "@/hooks/useModal";

import styles from "./index.module.scss";
import Button from "../Button";

export default function Modal() {
	const { data: session } = useSession();
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
				data-is-authenticated={Boolean(session?.user?.id)}
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
