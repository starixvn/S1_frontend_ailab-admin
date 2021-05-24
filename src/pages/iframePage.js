import { useLocation } from "react-router-dom";
import Layout from "../components/layout";
import config from "../config";

const Index = () => {
	const location = useLocation();
	return (
		<Layout>
			<main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
				<iframe
					title={location.state.funcKey}
					src={`${config.apiURL}${location.state.url}`}
				/>
			</main>
		</Layout>
	);
};

export default Index;
