/* eslint-disable @typescript-eslint/restrict-template-expressions */
// import styles from "./index.module.css";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import { api, getBaseUrl } from "~/utils/api";
import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { type FetchedMeta } from "./api/edge/metadata";
import { Heading } from "~/components";

type Shortlink = {
	code: string;
	longUrl: string;
};

function getShortlinksFromUserStorage() {
	return JSON.parse(localStorage.getItem("links") ?? "[]") as Shortlink[];
}

const Home: NextPage = () => {
	const [longUrl, setLongUrl] = useState("");
	const [localUrls, setLocalUrls] = useState<Shortlink[]>([]);
	const [selectedRowIndex, setSelectedRowIndex] = useState<number | undefined>();
	const [metadata, setMetadata] = useState<FetchedMeta | undefined>({});

	useEffect(() => {
		// Check if window is defined to prevent errors during SSR
		if (typeof window === undefined || !localStorage) return;
		setLocalUrls(getShortlinksFromUserStorage());
	}, []);

	const session = useSession();
	console.log("🚀 ~ file: index.tsx:15 ~ session:", session);
	const { data: urlsByUser = [] } = api.url.getByUserId.useQuery(undefined, {
		refetchOnWindowFocus: true,
		enabled: Boolean(session.data),
	});

	const ctx = api.useContext();

	const { mutateAsync: createUrl } = api.url.create.useMutation({
		onSuccess: (data) => {
			void ctx.url.getByUserId.invalidate();
			console.log("🚀 ~ file: index.tsx:22 ~ onSuccess: ~ data", data);

			localStorage.setItem(
				"links",
				JSON.stringify([...localUrls, { code: data.code, longUrl: data.longUrl }])
			);

			setLocalUrls((prevLocalUrls) => [
				...prevLocalUrls,
				{
					code: data.code,
					longUrl: data.longUrl,
				},
			]);
		},
		onError(error, variables, context) {
			console.error(
				`Error: ${error.message} \n\n Variables: ${JSON.stringify(variables, null, 2)}`
			);
		},
	});

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		try {
			const newUrl = await createUrl({ longUrl });
			console.log("🚀 ~ file: index.tsx:29 ~ handleSubmit ~ newUrl:", newUrl);
		} catch (error) {
			console.error(error);
		}

		setLongUrl("");
	}

	async function handleRowClick(index: number, longUrl: string) {
		setMetadata(undefined);
		setSelectedRowIndex(index);

		const { data: returnedMetadata } = (await fetch(`/api/edge/metadata?url=${longUrl}`).then(
			(res) => res.json()
		)) as {
			data: FetchedMeta;
		};

		setMetadata(returnedMetadata);

		console.log("🚀 ~ file: index.tsx:61 ~ handleRowClick ~ metadata:", metadata);
	}

	function handleCopy(text: string) {
		void navigator.clipboard.writeText(text).then(() => alert(`Copied ${text}`));
	}

	return (
		<>
			<Head>
				<title>teeny.fun</title>
				<meta
					name="description"
					content="Generated by create-t3-app"
				/>
				<link
					rel="icon"
					href="/favicon.ico"
				/>
			</Head>
			<main>
				<Heading tag="h1">
					<Heading.Span color="yellow">teenify</Heading.Span>
					<Heading.Span color="white">URLs with</Heading.Span>
					<Heading.Span color="yellow">emojis</Heading.Span>
				</Heading>
				{!session.data ? (
					<>
						<Link href="/auth/signin">Sign in</Link>
						{localUrls.length > 0 && (
							<div>
								<h2>Local URLs</h2>
								<ul>
									{localUrls.map(({ code, longUrl }, index) => (
										<li
											key={code}
											style={{ display: "flex", gap: "1em" }}
										>
											<a
												href={`${getBaseUrl()}/${code}`}
												target="_blank"
												style={{ display: "inline-block", width: 50 }}
											>
												{code}
											</a>
											<span
												onClick={() => void handleRowClick(index, longUrl)}
												style={{
													display: "inline-block",
													width: 150,
													overflow: "hidden",
													textOverflow: "ellipsis",
													whiteSpace: "pre",
												}}
											>
												{longUrl}
											</span>
											<button onClick={() => void handleCopy(`${getBaseUrl()}/${code}`)}>
												Copy
											</button>
										</li>
									))}
								</ul>
							</div>
						)}
					</>
				) : (
					<>
						<button onClick={() => void signOut()}>Sign out</button>
						<form
							onSubmit={(e) => void handleSubmit(e)}
							style={{ display: "flex", flexDirection: "column", gap: "0.5em", color: "white" }}
						>
							<label htmlFor="long-url">Long URL</label>
							<input
								type="text"
								id="long-url"
								name="long-url"
								required
								placeholder="Enter a URL"
								value={longUrl}
								onChange={(e) => setLongUrl(e.target.value)}
							/>
							<button type="submit">Create</button>
						</form>

						{urlsByUser.length > 0 && (
							<div>
								<h2>URLs for {session.data?.user.name}</h2>
								<ul>
									{urlsByUser?.map(({ id, code, longUrl, visits }, index) => (
										<li
											key={id}
											style={{ display: "flex", gap: "1em" }}
										>
											<a
												href={`${getBaseUrl()}/${code}`}
												target="_blank"
												style={{ display: "inline-block", width: 50 }}
											>
												{code}
											</a>
											<span
												onClick={() => void handleRowClick(index, longUrl)}
												style={{
													display: "inline-block",
													width: 150,
													overflow: "hidden",
													textOverflow: "ellipsis",
													whiteSpace: "pre",
												}}
											>
												{longUrl}
											</span>
											<span>{String(visits).padStart(2, "0")}</span>
											<button onClick={() => handleCopy(`${location.origin}/${code}`)}>Copy</button>
										</li>
									))}
								</ul>
							</div>
						)}
					</>
				)}
				<>
					{selectedRowIndex && metadata && (
						<div>
							<h2>Metadata for {metadata?.url}</h2>
							<ul>
								<li>
									<strong>Title:</strong> {metadata?.title}
								</li>
								<li>
									<strong>Description:</strong> {metadata?.description}
								</li>
								<li>
									<strong>Image:</strong> {metadata?.image}
									{metadata?.image && metadata?.title && (
										<>
											{/* eslint-disable-next-line @next/next/no-img-element */}
											<img
												src={metadata.image}
												alt={`image for ${metadata.title}`}
												style={{ width: "300px", height: "auto" }}
											/>
										</>
									)}
								</li>
							</ul>
						</div>
					)}
				</>
			</main>
		</>
	);
};

export default Home;
