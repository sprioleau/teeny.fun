import { type GetServerSidePropsContext, type InferGetServerSidePropsType } from "next";
import { getServerSession } from "next-auth";
import { getProviders, signIn } from "next-auth/react";
import { Button } from "~/components";
import { type ButtonColor } from "~/components/Button";
import { authOptions } from "~/server/auth";

export default function SignIn({
	providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	return (
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
			{Object.values(providers).map(({ name, id }, index) => (
				<div key={name}>
					<Button
						onClick={() => void signIn(id)}
						color={(["blue", "pink", "yellow"] satisfies ButtonColor[])[index % 3]}
					>
						with {name}
					</Button>
				</div>
			))}
		</div>
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
