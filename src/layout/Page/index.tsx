import { useSession } from "next-auth/react";
import React from "react";
import styles from "./index.module.scss";

type Props = {
	children: React.ReactNode;
};

export default function Page({ children }: Props) {
	const { data: session } = useSession();

	return (
		<section className={[styles.page, session ? styles["authenticated"] : ""].join(" ")}>
			{children}
		</section>
	);
}
