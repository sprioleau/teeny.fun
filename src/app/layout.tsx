import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { ModalContextProvider } from "@/contexts";
import Page from "@/layout/Page";
import { homepageMetadata } from "@/seo/metadata";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Modak, Space_Grotesk } from "next/font/google";
import { Toaster } from "react-hot-toast";

import "@/styles/globals.scss";

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

export const metadata: Metadata = homepageMetadata;

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
			<html lang="en">
				<body>
					<ModalContextProvider>
						<div className={["app", modak.variable, spaceGrotesk.variable].join(" ")}>
							<Navigation />
							<Page>{children}</Page>
							<Footer />
							<Toaster
								containerStyle={{ top: "calc(1.5em + var(--page-padding-y))" }}
								toastOptions={{
									className: "toaster",
									duration: 3500,
									ariaProps: {
										role: "status",
										"aria-live": "polite",
									},
								}}
							/>
						</div>
					</ModalContextProvider>
				</body>
			</html>
		</ClerkProvider>
	);
}
