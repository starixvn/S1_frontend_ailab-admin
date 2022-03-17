import Layout from "../../components/layout";
import WithdrawalListing from "../../components/finance/withdrawalListing/withdrawalListing";

const Index = () => (
	<Layout afterLogin={true}>
		<WithdrawalListing />
	</Layout>
);

export default Index;
