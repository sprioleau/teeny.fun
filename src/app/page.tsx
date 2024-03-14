import { Modal, ServerUrlForm, UrlList } from "@/components";
import HeroHeading from "@/components/HeroHeading";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
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
					<SignedOut>
						<SignInButton mode="modal" />
					</SignedOut>
					<SignedIn>
						<UserButton />
					</SignedIn>
				</header>
				<h1>teeny.fun</h1>
				<section className={styles.container}>
					<ServerUrlForm />
					{/* <UrlForm
						destinationUrl={destinationUrl}
						setDestinationUrl={setDestinationUrl}
						disabled={shouldDisableForm}
						onSubmit={handleSubmit}
					/> */}
					<UrlList />
				</section>
			</main>
			<Modal isAuthenticated={isAuthenticated} />
		</>
	);
}
