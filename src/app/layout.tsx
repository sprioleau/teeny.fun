import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Modak, Space_Grotesk } from "next/font/google";

import { Navigation, Footer } from "@/components";
import { ModalContextProvider } from "@/contexts";
import { Toaster } from "react-hot-toast";
import Page from "@/layout/Page";
import { Suspense } from "react";

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

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<ClerkProvider>
			<html lang="en">
				<body>
					{/* <ModalContextProvider> */}
					<div className={["app", modak.variable, spaceGrotesk.variable].join(" ")}>
						<Navigation />
						<Suspense fallback={<p>Loading...</p>}>
							<Page>{children}</Page>
						</Suspense>
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
					{/* </ModalContextProvider> */}
				</body>
			</html>
		</ClerkProvider>
	);
}