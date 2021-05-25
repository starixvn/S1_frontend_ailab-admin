import { useContext, useEffect } from "react";
import Layout from "../components/layout";
import { toggleSideMenuContext } from "../components/context";

const Index = () => {
	const { setMenu } = useContext(toggleSideMenuContext);

	useEffect(() => {
		setMenu(prev => ({ ...prev, showArea: null }));
	}, []);

	return (
		<Layout>
			<main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
				<div className="row bd-example">
					<h2>Page Not Found</h2>
				</div>
			</main>
		</Layout>
	);
};

export default Index;
