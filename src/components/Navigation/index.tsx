import Button from "../Button";
import { AiOutlineUser } from "react-icons/ai";

import styles from "./index.module.scss";
import Logo from "../Logo";
import Link from "next/link";

export default function Navigation() {
	return (
		<nav className={styles.nav}>
			<div className={styles.logo}>
				<Link href="/">
					<Logo />
				</Link>
			</div>
			{/* <p className={styles.heading}>Generate and customize emoji-only shortlinks</p> */}
			<div className={styles.buttons}>
				{/* <Button
					href="/auth/signin"
					className="button"
					icon={<FiArrowUpRight />}
					color="yellow"
				>
					Start for free
				</Button> */}
				<Button
					href="/auth/signin"
					className="button"
					icon={<AiOutlineUser />}
					color="yellow"
				>
					Sign in
				</Button>
			</div>
		</nav>
	);
}
