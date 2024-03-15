import Link from "next/link";
import { Logo, Button } from "@/components";
import { AiOutlineUser } from "react-icons/ai";
// import UserAvatar from "../UserAvatar";
import { SignInButton, SignedIn, SignedOut, UserButton, useAuth } from "@clerk/nextjs";

import styles from "./index.module.scss";
import UserAvatar from "../UserAvatar";

export default function Navigation() {
	return (
		<nav className={styles.nav}>
			<div className={styles.logo}>
				<Link href="/">
					<Logo />
				</Link>
			</div>
			<div className={styles.buttons}>
				<SignedOut>
					<SignInButton mode="modal" />
					<Button
						href="/auth/signin"
						icon={<AiOutlineUser />}
						color="yellow"
					>
						Sign in
					</Button>
				</SignedOut>
				<SignedIn>
					<UserButton />
					<Button
						// onClick={() => console.log("sign out")}
						icon={<UserAvatar />}
						color="yellow"
					>
						Sign out
					</Button>
				</SignedIn>
				{/* {isLoaded && !isSignedIn ? (
					<Button
						href="/auth/signin"
						icon={<AiOutlineUser />}
						color="yellow"
					>
						Sign in
					</Button>
				) : (
					<Button
						onClick={() => void handleSignOut()}
						icon={<UserAvatar />}
						color="yellow"
					>
						Sign out
					</Button>
				)} */}
			</div>
		</nav>
	);
}
