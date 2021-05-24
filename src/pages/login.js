import { Helmet, HelmetProvider } from "react-helmet-async";
import Login from "../components/Login/login";

const DynamicAttr = () => (
	<Helmet
		bodyAttributes={{
			class: "text-center"
		}}
	/>
);

const Index = () => (
	<>
		<HelmetProvider>
			<DynamicAttr />
		</HelmetProvider>

		<Login />
	</>
);

export default Index;
