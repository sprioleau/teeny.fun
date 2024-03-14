import Link from "next/link";
import Logo from "@/components/Logo";
// import { AiOutlineUser } from "react-icons/ai";
// import Button from "../Button";
// import UserAvatar from "../UserAvatar";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

import styles from "./index.module.scss";

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
				</SignedOut>
				<SignedIn>
					<UserButton />
				</SignedIn>
				{/* {!session ? (
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
