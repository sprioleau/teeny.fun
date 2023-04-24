import { type AppType } from "next/app";
import { Modak, Space_Grotesk } from "next/font/google";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Footer, Modal, Navigation } from "~/components";
import { ModalContextProvider } from "~/contexts";
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
	weight: ["400", "700"],
	style: "normal",
	fallback: ["monospace"],
});

const MyApp: AppType<{ session: Session | null }> = ({
	Component,
	pageProps: { session, ...pageProps },
}) => {
	return (
		<SessionProvider session={session}>
			<ModalContextProvider>
				<div className={["app", modak.variable, spaceGrotesk.variable].join(" ")}>
					<Navigation />
					<Page>
						<Component {...pageProps} />
					</Page>
					<Footer />
					<Modal />
				</div>
			</ModalContextProvider>
		</SessionProvider>
	);
};

export default api.withTRPC(MyApp);
