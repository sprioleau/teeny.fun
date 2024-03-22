import Logo from "@/components/Logo";
import SignInOutButtons from "@/components/SignInOutButtons";
import Link from "next/link";

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
				{/* TODO: Use signIn function to connect clientKey to user */}
				<SignInOutButtons />
			</div>
		</nav>
	);
}
