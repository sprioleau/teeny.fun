import { type NextPage } from "next";

const ErrorPage: NextPage = (props) => {
	console.log("🚀 ~ file: index.tsx:4 ~ props:", props);

	return <pre>{JSON.stringify(props, null, 2)}</pre>;
};

export default ErrorPage;
