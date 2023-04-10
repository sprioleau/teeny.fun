import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Inter, Modak } from "next/font/google";

import { api } from "~/utils/api";

import "~/styles/globals.css";

const inter = Inter({
	subsets: ["latin"],
	variable: "--ff-sans",
});

const modak = Modak({
	variable: "--ff-serif",
	subsets: ["latin"],
	weight: "400",
});

const MyApp: AppType<{ session: Session | null }> = ({
	Component,
	pageProps: { session, ...pageProps },
}) => {
	return (
		<SessionProvider session={session}>
			<div className={inter.className}>
				<Component {...pageProps} />
			</div>
		</SessionProvider>
	);
};

export default api.withTRPC(MyApp);
