import { type GetServerSidePropsContext, type InferGetServerSidePropsType, type NextPage } from "next";
import { getProviders, signIn, signOut, useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "~/server/auth";

// const SignInPage: NextPage = () => {
// 	const { data: session } = useSession();

// 	return (
// 		<>
// 			{session ? (
// 				<>
// 					Signed in as {session.user.email} <br />
// 					<button onClick={() => void signOut()}>Sign out</button>
// 				</>
// 			) : (
// 				<>
// 					Not signed in <br />
// 					<button onClick={() => void signIn()}>Sign in</button>
// 				</>
// 			)}
// 		</>
// 	);
// };

// export default SignInPage;

export default function SignIn({ providers }: InferGetServerSidePropsType<typeof getServerSideProps>) {
	return (
		<div style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "0.5em", fontSize: "1.5em" }}>
			{Object.values(providers).map(({ name, id }) => (
				<div key={name}>
					<button onClick={() => void signIn(id)}>Sign in with {name}</button>
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
