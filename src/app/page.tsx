import { Modal, UrlForm, UrlList } from "@/components";
import HeroHeading from "@/components/HeroHeading";
import { auth } from "@clerk/nextjs/server";

import styles from "./index.module.scss";

export default async function Home() {
	const { userId: authenticatedUserId } = auth();

	const isAuthenticated = Boolean(authenticatedUserId);

	return (
		<>
			<main className={styles.main}>
				<header className={styles.header}>
					<HeroHeading />
				</header>
				<section className={styles.container}>
					<UrlForm />
					<UrlList />
				</section>
			</main>
			<Modal isAuthenticated={isAuthenticated} />
		</>
	);
}
