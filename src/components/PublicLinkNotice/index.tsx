import {
	ClerkLoaded,
	// SignUpButton as ClerkSignUpButton,
	SignedOut,
} from "@clerk/nextjs";
// import { HiOutlineRocketLaunch } from "react-icons/hi2";
// import Button from "../Button";

import styles from "./index.module.scss";

// const MAX_PUBLIC_URLS_COUNT = 4;

export default function PublicLinkNotice() {
	return (
		<ClerkLoaded>
			<SignedOut>
				<div className={styles["main"]}>
					<p>All links will be automatically-deleted after 24 hours.</p>
					{/* {isLimitExceeded && (
						<p>
							Maximum number of links reached. Either delete existing links or create a free
							account.
						</p>
					)} */}
					{/* <ClerkSignUpButton mode="modal">
						<Button
							icon={<HiOutlineRocketLaunch />}
							color="blue"
						>
							Create a free account
						</Button>
					</ClerkSignUpButton> */}
				</div>
			</SignedOut>
		</ClerkLoaded>
	);
}
