import { useLocation } from "react-router-dom";
import Layout from "../components/layout";
import config, { siteInfo } from "../config";

const Index = () => {
	const location = useLocation();
	const { Controller, Action, Title } = location?.state ?? {};
	const url =
		Controller && Action
			? `${Controller}/${Action}`
			: siteInfo.defaultIndex;
	return (
		<Layout>
			<main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
				<iframe
					title={Title ?? "Index"}
					src={`${config.apiURL}/${url}`}
				/>
			</main>
		</Layout>
	);
};

export default Index;
