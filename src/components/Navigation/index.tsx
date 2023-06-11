import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { AiOutlineUser } from "react-icons/ai";

import styles from "./index.module.scss";
import Button from "../Button";
import Logo from "../Logo";

export default function Navigation() {
	const { data: session } = useSession();

	async function handleSignOut() {
		await signOut();
	}

	return (
		<nav className={styles.nav}>
			<div className={styles.logo}>
				<Link href="/">
					<Logo />
				</Link>
			</div>
			<div className={styles.buttons}>
				{!session ? (
					<Button
						href="/auth/signin"
						className="button"
						icon={<AiOutlineUser />}
						color="yellow"
					>
						Sign in
					</Button>
				) : (
					<Button
						onClick={() => void handleSignOut()}
						className="button"
						icon={<AiOutlineUser />}
						color="yellow"
					>
						Sign out
					</Button>
				)}
			</div>
		</nav>
	);
}
