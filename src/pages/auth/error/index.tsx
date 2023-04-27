import { type NextPage } from "next";

const ErrorPage: NextPage = (props) => {
	return <pre>{JSON.stringify(props, null, 2)}</pre>;
};

export default ErrorPage;
