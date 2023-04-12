import React from "react";
import styles from "./index.module.scss";

type Props = {
	children: React.ReactNode;
};

export default function Page({ children }: Props) {
	return <section className={styles.page}>{children}</section>;
}
