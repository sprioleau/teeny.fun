import { ClerkLoaded, SignUpButton as ClerkSignUpButton, SignedOut, useAuth } from "@clerk/nextjs";
import { HiOutlineRocketLaunch } from "react-icons/hi2";
import Button from "../Button";

import styles from "./index.module.scss";

export default function PublicLinkNotice() {
	return (
		<ClerkLoaded>
			<SignedOut>
				<div className={styles["main"]}>
					<p>Public links will be automatically-deleted after 24 hours. </p>
					<ClerkSignUpButton mode="modal">
						<Button
							icon={<HiOutlineRocketLaunch />}
							color="blue"
						>
							Create a free account
						</Button>
					</ClerkSignUpButton>
				</div>
			</SignedOut>
		</ClerkLoaded>
	);
}
