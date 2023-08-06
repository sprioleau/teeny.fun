// Modified from https://github.com/luisivan/fetch-meta-tags/blob/master/rulesets.js

import { type HTMLElement } from "node-html-parser";

function attr(attribute: string) {
	return (element: HTMLElement) => {
		if (!element) return null;
		return element?.getAttribute(attribute) ?? null;
	};
}

function text() {
	return (element: HTMLElement) => {
		if (!element) return null;
		return element.innerText;
	};
}

type MetadataRules = {
	dataKey: string;
	rules: [string, (element: HTMLElement) => string | null][];
	default?: string;
	absolute?: boolean;
}[];

export const metadataRules: MetadataRules = [
	{
		dataKey: "title",
		rules: [
			['meta[property="og:title"]', attr("content")],
			['meta[name="twitter:title"]', attr("content")],
			['meta[property="twitter:title"]', attr("content")],
			["title", text()],
		],
	},
	{
		dataKey: "description",
		rules: [
			['meta[property="og:description"]', attr("content")],
			['meta[name="description" i]', attr("content")],
		],
	},
	{
		dataKey: "icon",
		default: "favicon.ico",
		absolute: true,
		rules: [
			['link[rel="apple-touch-icon"]', attr("href")],
			['link[rel="apple-touch-icon-precomposed"]', attr("href")],
			['link[rel="icon" i]', attr("href")],
		],
	},
	{
		dataKey: "image",
		absolute: true,
		rules: [
			['meta[property="og:image:secure_url"]', attr("content")],
			['meta[property="og:image:url"]', attr("content")],
			['meta[property="og:image"]', attr("content")],
			['meta[name="twitter:image"]', attr("content")],
			['meta[property="twitter:image"]', attr("content")],
			['meta[name="thumbnail"]', attr("content")],
		],
	},
];
