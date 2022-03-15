import { useContext } from "react";
import { useLocation } from "react-router-dom";
import Layout from "../components/layout";
import config, { siteInfo } from "../config";
import { menuContext } from "../components/context";

const Index = () => {
	const location = useLocation();
	const { menu } = useContext(menuContext);

	const { Controller, Action, Title, FuncKey } = location?.state ?? {};
	const funcKey = FuncKey ?? siteInfo.defaultFuncKey;

	const defaultIndex = siteInfo.defaultIndex.startsWith(
		`${siteInfo.oldSitePrefixUrl}/`
	)
		? siteInfo.defaultIndex.replace(`${siteInfo.oldSitePrefixUrl}/`, "")
		: siteInfo.defaultIndex;

	const url = Controller && Action ? `${Controller}/${Action}` : defaultIndex;
	return (
		<Layout>
			<main className="col-md-9 col-lg-10">
				{funcKey in menu?.allowfuncKeys && (
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
