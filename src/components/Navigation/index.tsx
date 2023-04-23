import { signOut, useSession } from "next-auth/react";

import { AiOutlineUser } from "react-icons/ai";
import Button from "../Button";
import Link from "next/link";
import Logo from "../Logo";
import styles from "./index.module.scss";

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
				{/* <Button
					href="/auth/signin"
					className="button"
					icon={<FiArrowUpRight />}
					color="yellow"
				>
					Start for free
				</Button> */}
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
