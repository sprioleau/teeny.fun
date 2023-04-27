import { type Metadata, type Url } from "@prisma/client";
import { type NextPage } from "next";
import Head from "next/head";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { Heading, PublicLinkNotice, UrlForm, UrlList } from "~/components";

import { DEFAULT_LOCAL_URLS_KEY } from "~/constants/localStorageKeys";
import { useLocalStorage } from "~/hooks";
import { api } from "~/utils/api";
import styles from "./index.module.scss";

export type UrlWithMetadata = Url & {
	metadata: Metadata | null;
};

export type LocalUrl = Pick<Url, "codePoints" | "destinationUrl">;

const Home: NextPage = () => {
	// TODO: Get URLs by user ID

	const { data: session } = useSession();
	const [destinationUrl, setDestinationUrl] = useState("");

	const [localUrls, setLocalUrls] = useLocalStorage<LocalUrl[]>(DEFAULT_LOCAL_URLS_KEY, []);
	const combinedCodePoints = localUrls.map(({ codePoints }) => codePoints ?? "").join(":");

	const { data: publicUrls } = api.url.getPublicUrlsByCode.useQuery(
		{ combinedCodePoints }
		// Cannot use the enabled property since it will make the invalidate method not work
		// {
		// 	enabled: !Boolean(combinedCodePoints),
		// }
	);

	const { data: userPrivateUrls } = api.url.getByUserId.useQuery(undefined, {
		enabled: Boolean(session),
	});

	const ctx = api.useContext();

	const { mutateAsync: createUrl } = api.url.create.useMutation({
		onSuccess(data) {
			const { codePoints, destinationUrl } = data;

			if (!session) {
				setLocalUrls([
					...localUrls,
					{
						codePoints,
						destinationUrl,
					},
				]);
			}

			setDestinationUrl("");
		},
		onError(error, variables, _context) {
			console.error(
				`Error: ${error.message} \n\n Variables: ${JSON.stringify(variables, null, 2)}`
			);
		},
		onSettled(data) {
			if (!data) return;

			const updatedLocalUrls = [
				...localUrls,
				{ codePoints: data?.codePoints, destinationUrl: data?.destinationUrl },
			];

			const combinedCodePoints =
				updatedLocalUrls.map(({ codePoints }) => codePoints).join(":") ?? "";

			void ctx.url.getPublicUrlsByCode.invalidate({
				combinedCodePoints,
			});
		},
	});

	const shouldDisableForm = localUrls.length >= 3;

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		if (shouldDisableForm) return;

		await createUrl({ destinationUrl });
	}

	return (
		<>
			<Head>
				<title>teeny.fun</title>
				<meta
					name="description"
					content="Shortlinks with emojis"
				/>
				<link
					rel="icon"
					href="/favicon.png"
					type="image/png"
				/>
			</Head>
			<main className={styles.main}>
				<header className={styles.header}>
					<Heading tag="h1">
						<Heading.Span
							text="teenify"
							color="yellow"
							index={0}
						/>
						<Heading.Span
							text="URLs with"
							color="white"
							index={1}
						/>
						<Heading.Span
							text="emojis"
							color="yellow"
							index={2}
						/>
					</Heading>
				</header>
				<section className={styles.container}>
					<UrlForm
						destinationUrl={destinationUrl}
						setDestinationUrl={setDestinationUrl}
						disabled={shouldDisableForm}
						onSubmit={handleSubmit}
					/>
					<UrlList
						publicUrls={publicUrls}
						userPrivateUrls={userPrivateUrls}
					/>
					{!session && <PublicLinkNotice />}
				</section>
			</main>
		</>
	);
};

export default Home;
