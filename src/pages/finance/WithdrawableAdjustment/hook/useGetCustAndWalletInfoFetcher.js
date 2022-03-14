import { useContext } from "react";
import { allSiteListContext } from "../../../../components/context";
import { api_WithdrawalLimitAdjustment_GetCustAndWalletInfo } from "../../../../service/api/WithdrawalLimitAdjustment";

const useGetCustAndWalletInfoFetcher = () => {
	const { siteId } = useContext(allSiteListContext);

	const getCustAndWalletInfo = async userName => {
		const {
			data
		} = await api_WithdrawalLimitAdjustment_GetCustAndWalletInfo({
			siteId,
			userName
		});

		if (data.errorCode !== 0) {
			throw new Error(data.message);
		}

		return data?.data ?? {};
	};

	return { getCustAndWalletInfo };
};

export { useGetCustAndWalletInfoFetcher };
