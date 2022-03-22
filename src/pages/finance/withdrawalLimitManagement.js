import Layout from "../../components/layout";
import WithdrawalLimitManagement from "../../components/finance/withdrawalLimitManagement/withdrawalLimitManagement";

const Index = () => (
	<Layout afterLogin={true}>
		<WithdrawalLimitManagement />
	</Layout>
);

export default Index;
