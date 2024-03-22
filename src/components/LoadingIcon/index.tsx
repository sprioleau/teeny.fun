import { AiOutlineLoading } from "react-icons/ai";

import styles from "./index.module.scss";

export default function LoadingIcon() {
	return <AiOutlineLoading className={styles["loading-icon"]} />;
}
