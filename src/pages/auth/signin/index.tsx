import Head from "next/head";
import { getProviders, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { Button } from "@/components";
import { type ButtonColor } from "@/components/Button";

type ProviderObject = Awaited<ReturnType<typeof getProviders>>;

export default function SignIn() {
	const [providers, setProviders] = useState<ProviderObject>(null);

	useEffect(() => {
		async function getClientAuthProviders(callback: (providers: ProviderObject) => void) {
			const clientAuthProviders = await getProviders();
			callback(clientAuthProviders);
		}

		void getClientAuthProviders((returnedProviders) => {
			if (!returnedProviders) return;
			setProviders(returnedProviders);
		});
	}, []);

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
					color: "#fff",
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
