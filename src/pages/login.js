import { Helmet, HelmetProvider } from "react-helmet-async";
import Login from "../components/Login/login";
import Layout from "../components/layout";

const DynamicAttr = () => (
	<Helmet
		bodyAttributes={{
			class: "text-center"
		}}
	/>
);

const Index = () => (
	<Layout afterLogin={false}>
		<HelmetProvider>
			<DynamicAttr />
		</HelmetProvider>
		<Login />
	</Layout>
);

export default Index;
