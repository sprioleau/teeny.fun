import HeroHeading from "@/components/HeroHeading";
import Modal from "@/components/Modal";
import UrlForm from "@/components/UrlForm";
import { getUrlsByAuthenticatedUserId } from "@/db/utils";
import { auth } from "@clerk/nextjs/server";

import styles from "./index.module.scss";

export default async function HomePage() {
	const { userId: authenticatedUserId } = auth();
	const urls = await getUrlsByAuthenticatedUserId(authenticatedUserId);

	return (
		<>
			<main className={styles.main}>
				<header className={styles.header}>
					<HeroHeading />
				</header>
				<section className={styles.container}>
					<UrlForm urls={urls} />
				</section>
			</main>
			<Modal isAuthenticated={Boolean(authenticatedUserId)} />
		</>
	);
}
