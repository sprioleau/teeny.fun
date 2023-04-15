import Button from "../Button";
import { FiGithub } from "react-icons/fi";
import styles from "./index.module.scss";

export default function Footer() {
	return (
		<footer className={styles.footer}>
			<div className={styles.byline}>
				by{" "}
				<a
					href="https://github.com/sprioleau"
					className={styles.link}
				>
					San&apos;Quan Prioleau
				</a>
			</div>
			<div className={styles.buttons}>
				<Button
					as="a"
					href="https://github.com/sprioleau/teeny.fun-v2"
					className="button"
					icon={<FiGithub />}
					color="yellow"
				>
					Star project
				</Button>
			</div>
		</footer>
	);
}
