import Button from "@/components/Button";
import UserAvatar from "@/components/UserAvatar";
import {
	ClerkLoaded,
	ClerkLoading,
	SignInButton as ClerkSignInButton,
	SignOutButton as ClerkSignOutButton,
	SignedIn,
	SignedOut,
} from "@clerk/nextjs";
import { AiOutlineLoading, AiOutlineUser } from "react-icons/ai";

import styles from "./index.module.scss";

export default function SignInOutButtons() {
	return (
		<>
			<ClerkLoading>
				{/* TODO: Animate if not alread done */}
				<AiOutlineLoading className={styles["loading-icon"]} />
			</ClerkLoading>
			<ClerkLoaded>
				<SignedOut>
					<ClerkSignInButton
						mode="modal"
						// afterSignInUrl="/dashboard"
					>
						<Button
							icon={<AiOutlineUser />}
							color="yellow"
						>
							Sign in
						</Button>
					</ClerkSignInButton>
				</SignedOut>
				<SignedIn>
					<ClerkSignOutButton>
						<Button icon={<UserAvatar />}>Sign Out</Button>
					</ClerkSignOutButton>
				</SignedIn>
			</ClerkLoaded>
		</>
	);
}
