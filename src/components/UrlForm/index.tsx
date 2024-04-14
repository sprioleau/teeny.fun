"use client";

import { createUrl } from "@/actions";
import { createUrlSchema } from "@/actions/schemas";
import { UrlWithMetadata } from "@/db/types";
import { SubmitIcon } from "@/icons";
import { emojiToCodePoints, generateShortCode, getParsedFormData } from "@/utils";
import { useAuth } from "@clerk/nextjs";
import { useOptimistic, useRef } from "react";
import { useFormStatus } from "react-dom";
import { FiLink2 } from "react-icons/fi";
import Button from "../Button";
import LoadingIcon from "../LoadingIcon";
import PublicLinkNotice from "../PublicLinkNotice";
import UrlInfoCard from "../UrlInfoCard";

import styles from "./index.module.scss";

type Props = {
	urls: UrlWithMetadata[];
};

export default function UrlForm({ urls }: Props) {
	const { userId: authenticatedUserId } = useAuth();

	const formRef = useRef<HTMLFormElement>(null);
	const { pending: isPending } = useFormStatus();
	const [optimisticUrls, addOptimisticUrl] = useOptimistic(
		urls,
		(currentState, { destinationUrl, code }) => {
			const lastUrl = currentState.at(-1);

			return [
				...currentState,
				{
					id: 10_000,
					clientKey: crypto.randomUUID(),
					destinationUrl,
					code,
					codePoints: emojiToCodePoints(code),
					visits: 0,
					createdAt: new Date(),
					updatedAt: new Date(),
					userAuthProviderId: lastUrl?.userAuthProviderId ?? null,
					userId: lastUrl?.userId ?? null,
					metadataId: 10_000,
					metadata: {
						id: 10_000,
						title: null,
						description: null,
						image: null,
						icon: null,
						url: destinationUrl,
					},
				},
			];
		}
	);

	const hasReachedPublicUrlLimit = !authenticatedUserId && optimisticUrls.length >= 4;
	const shouldDisableForm = isPending || hasReachedPublicUrlLimit;

	async function handleSubmit(formData: FormData) {
		if (hasReachedPublicUrlLimit) return;

		const { "destination-url": destinationUrl, code } = getParsedFormData({
			formData,
			schema: createUrlSchema,
		});

		// Add optimistic URL
		addOptimisticUrl({
			destinationUrl,
			code,
		});

		// Reset form
		formRef.current?.reset();

		// Create URL
		await createUrl(formData);
	}

	return (
		<>
			<form
				ref={formRef}
				action={handleSubmit}
				className={styles.form}
			>
				<span className={styles["link-icon"]}>
					<FiLink2 />
				</span>
				<label
					htmlFor="destination-url"
					className={styles.label}
				>
					Long URL
				</label>
				<input
					type="hidden"
					hidden
					aria-hidden
					name="code"
					value={generateShortCode()}
				/>
				<input
					type="text"
					id="destination-url"
					name="destination-url"
					className={styles.input}
					required
					disabled={shouldDisableForm}
					placeholder="Paste in your link"
					inputMode="url"
				/>
				<Button
					type="submit"
					title="Submit"
					className={styles["submit-button"]}
					icon={isPending ? <LoadingIcon /> : <SubmitIcon />}
				/>
			</form>
			{optimisticUrls.length > 0 && <PublicLinkNotice />}
			{optimisticUrls?.length > 0 && (
				<ul className={styles["url-list"]}>
					{optimisticUrls.map((url) => (
						<UrlInfoCard
							key={url.id}
							url={url}
						/>
					))}
				</ul>
			)}
		</>
	);
}
