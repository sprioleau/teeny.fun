import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Modak, Space_Grotesk } from "next/font/google";
import { Footer, Navigation } from "~/components";
import { Page } from "~/layout";
import { api } from "~/utils/api";

import "~/styles/globals.scss";

const modak = Modak({
	variable: "--ff-serif",
	subsets: ["latin"],
	weight: "400",
	style: "normal",
	fallback: ["serif"],
});

const spaceGrotesk = Space_Grotesk({
	variable: "--ff-mono",
	subsets: ["latin"],
	weight: ["400", "500", "700"],
	style: "normal",
	fallback: ["monospace"],
});

const MyApp: AppType<{ session: Session | null }> = ({
	Component,
	pageProps: { session, ...pageProps },
}) => {
	return (
		<SessionProvider session={session}>
			<div className={["app", modak.variable, spaceGrotesk.variable].join(" ")}>
				<Navigation />
				<Page>
					<Component {...pageProps} />
				</Page>
				<Footer />
			</div>
		</SessionProvider>
	);
};

export default api.withTRPC(MyApp);
