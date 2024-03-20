import React from "react";
import { auth } from "@clerk/nextjs/server";

import styles from "./index.module.scss";

type Props = {
	children: React.ReactNode;
};

export default function Page({ children }: Props) {
	const { userId } = auth();

	return (
		<section className={[styles.page, userId ? styles["authenticated"] : ""].join(" ")}>
			{children}
		</section>
	);
}
