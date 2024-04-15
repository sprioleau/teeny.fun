import HeroHeading from "@/components/HeroHeading";
import Modal from "@/components/Modal";
import UrlForm from "@/components/UrlForm";
import { PERSISTED_CLIENT_KEY } from "@/constants";
import { getUrlsByClientKey } from "@/db/utils";
import { cookies } from "next/headers";

import styles from "./index.module.scss";

export default async function HomePage() {
	const clientKey = cookies().get(PERSISTED_CLIENT_KEY)?.value;
	const urls = await getUrlsByClientKey(clientKey);
	const isAuthenticated = false;
	// const isAuthenticated = Boolean(authenticatedUserId);

	// const { userId: authenticatedUserId } = auth();
	// const urls = await getUrlsByAuthenticatedUserId(authenticatedUserId);

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
			<Modal isAuthenticated={isAuthenticated} />
		</>
	);
}
