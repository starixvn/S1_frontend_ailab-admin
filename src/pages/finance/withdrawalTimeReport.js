import Layout from "../../components/layout";
import WithdrawalTimeReport from "../../components/finance/withdrawalTimeReport/withdrawalTimeReport";

const Index = () => (
	<Layout afterLogin={true}>
		<WithdrawalTimeReport />
	</Layout>
);

export default Index;
