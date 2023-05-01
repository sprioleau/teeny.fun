import { type GetServerSidePropsContext, type InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { getServerSession } from "next-auth";
import { getProviders, signIn } from "next-auth/react";
// import { useEffect, useState } from "react";
import { Button } from "~/components";
import { type ButtonColor } from "~/components/Button";
import { authOptions } from "~/server/auth";

// type ProviderObject = Awaited<ReturnType<typeof getProviders>>;

// export default function SignIn() {
export default function SignIn({
	providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	// const [providers, setProviders] = useState<ProviderObject>(null);
	console.log("🚀 ~ file: index.tsx:13 ~ providers:", providers);

	// useEffect(() => {
	// 	async function getClientAuthProviders(callback: (providers: ProviderObject) => void) {
	// 		const clientAuthProviders = await getProviders();
	// 		callback(clientAuthProviders);
	// 	}

	// 	void getClientAuthProviders((returnedProviders) => {
	// 		if (!returnedProviders) return;
	// 		setProviders(returnedProviders);
	// 	});
	// }, []);

	return (
		<>
			<Head>
				<title>Sign in | teeny.fun</title>
				<meta
					name="description"
					content="Sign in | Shortlinks with emojis"
				/>
				<link
					rel="icon"
					href="/favicon.png"
					type="image/png"
				/>
			</Head>
			<div
				style={{
					padding: "2rem",
					display: "flex",
					flexDirection: "column",
					gap: "0.5em",
					fontSize: "1.5em",
				}}
			>
				<h1>Sign in</h1>
				{providers ? (
					Object.values(providers).map(({ name, id }, index) => (
						<div key={name}>
							<Button
								onClick={() =>
									void signIn(id, {
										callbackUrl:
											process.env.NODE_ENV === "production"
												? "https://teeny-fun-v2.vercel.app"
												: "http://localhost:3000",
										redirect: false,
									})
								}
								color={(["blue", "pink", "yellow"] satisfies ButtonColor[])[index % 3]}
							>
								with {name}
							</Button>
						</div>
					))
				) : (
					<p>Loading...</p>
				)}
			</div>
		</>
	);
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const session = await getServerSession(context.req, context.res, authOptions);

	// If the user is already logged in, redirect.
	// Note: Make sure not to redirect to the same page
	// To avoid an infinite loop!
	if (session) {
		return { redirect: { destination: "/" } };
	}

	const providers = (await getProviders()) ?? [];

	return {
		props: { providers },
	};
}
