import HeroHeading from "@/components/HeroHeading";
import Modal from "@/components/Modal";
import PublicUrlList from "@/components/PublicUrlList";
import UrlForm from "@/components/UrlForm";
import UrlList from "@/components/UrlList";
import { auth } from "@clerk/nextjs/server";

import styles from "./index.module.scss";

export default async function HomePage() {
	const { userId: authenticatedUserId } = auth();

	return (
		<>
			<main className={styles.main}>
				<header className={styles.header}>
					<HeroHeading />
				</header>
				<section className={styles.container}>
					<UrlForm />
					{/* <Suspense fallback={<p>Loading...</p>}> */}
					<UrlList />
					<PublicUrlList />
					{/* </Suspense> */}
				</section>
			</main>
			<Modal isAuthenticated={Boolean(authenticatedUserId)} />
		</>
	);
}
