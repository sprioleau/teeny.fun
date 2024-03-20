import HeroHeading from "@/components/HeroHeading";
import Modal from "@/components/Modal";
import UrlForm from "@/components/UrlForm";
import UrlList from "@/components/UrlList";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import styles from "./index.module.scss";

export default async function DashboardPage() {
	const { userId: authenticatedUserId } = auth();

	if (!authenticatedUserId) {
		return redirect("/");
	}

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
					{/* </Suspense> */}
				</section>
			</main>
			<Modal isAuthenticated={Boolean(authenticatedUserId)} />
		</>
	);
}
