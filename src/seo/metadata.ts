import { Metadata, Viewport } from "next";

const fullName = "San'Quan Prioleau";
const title = "teeny.fun | An emoji-powered link shortener";
const description = "A modern, fast, emoji-powered link shortener";
const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
const baseUrl = `${protocol}://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
const keywords = [fullName, "short URL", "link shortener", "bit.ly", "tinyurl.com", "emojis"];

const baseOgConfig = {
	title,
	description,
	images: [
		{
			url: "/_static/images/social-card.png",
			width: 1200,
			height: 630,
			alt: description,
		},
	],
};

const metadataBase = new URL(baseUrl);

export const homepageViewport: Viewport = {
	initialScale: 1,
	width: "device-width",
	themeColor: "#ed6e92",
	colorScheme: "light",
};

export const homepageMetadata: Metadata = {
	title,
	description,
	applicationName: "teeny.fun",
	generator: "Next.js",
	// referrer: "origin-when-cross-origin",
	icons: [
		{
			rel: "icon shortcut",
			type: "image/x-icon",
			sizes: "150x150",
			url: "/icon.ico",
		},
	],
	// manifest: "/manifest.json",
	keywords,
	authors: [{ name: fullName, url: baseUrl }],
	creator: fullName,
	formatDetection: {
		email: false,
		address: false,
		telephone: false,
	},
	metadataBase,
	openGraph: {
		...baseOgConfig,
		url: baseUrl,
		siteName: title,
		locale: "en-US",
		type: "website",
	},
	twitter: baseOgConfig,
};
