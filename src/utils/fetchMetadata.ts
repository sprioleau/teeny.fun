// Modified from https://github.com/luisivan/fetch-meta-tags/blob/master/rulesets.js

import { parse } from "node-html-parser";
import { metadataRules } from "~/constants/metadataRulesets";

function readBody(body: Body["body"]): Promise<string> {
	/* eslint-disable @typescript-eslint/no-misused-promises */
	return new Promise(async (resolve) => {
		if (!body) resolve("");
		let head = "";

		// Reference: https://stackoverflow.com/questions/43694281/ts2318-cannot-find-global-type-asynciterableiterator-async-generator
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		for await (const chunk of body) {
			head += Buffer.from(chunk as string).toString();
			const hasReachedEndOfHead = head.includes("</head>");

			if (hasReachedEndOfHead) {
				const [beforeHeadTag = "<head>"] = head.split("</head>");
				head += `${beforeHeadTag}</head></html>`;
				resolve(head);
			}
		}

		resolve(head);
	});
}

async function fetchHead(url: string) {
	const res = await fetch(url);
	return readBody(res.body);
}

function getAbsoluteUrl(url: string, path: string) {
	const origin = new URL(url).origin;
	return new URL(path, origin).toString();
}

export default async function fetchMeta(url: string) {
	const head = await fetchHead(url);
	const dom = parse(head);

	const metadata = {} as Record<string, string>;

	metadata.url = url;

	for (const property of metadataRules) {
		const rules = property.rules;

		for (const rule of rules) {
			const [selector, getter] = rule;
			const element = dom.querySelector(selector);
			if (!element) continue;

			const data = getter(element);
			if (!data) continue;

			metadata[property.dataKey] = property.absolute ? getAbsoluteUrl(url, data) : data;

			if (!metadata[property.dataKey] && property.default) {
				metadata[property.dataKey] = getAbsoluteUrl(url, property.default);
			}

			break;
		}
	}

	return metadata;
}
