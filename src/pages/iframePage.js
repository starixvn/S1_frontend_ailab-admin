import { useContext } from "react";
import { useLocation } from "react-router-dom";
import Layout from "../components/layout";
import config, { siteInfo } from "../config";
import { toggleSideMenuContext } from "../components/context";

const Index = () => {
	const location = useLocation();
	const { menu } = useContext(toggleSideMenuContext);

	const { Controller, Action, Title, FuncKey } = location?.state ?? {};
	const funcKey = FuncKey ?? siteInfo.defaultFuncKey;

	const url =
		Controller && Action
			? `${Controller}/${Action}`
			: siteInfo.defaultIndex;

	return (
		<Layout>
			<main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
				{menu?.allowfuncKeys?.some(fKey => fKey === funcKey) && (
					<iframe
						title={Title ?? "Index"}
						src={`${config.apiURL}/${url}`}
					/>
				)}
			</main>
		</Layout>
	);
};

export default Index;
