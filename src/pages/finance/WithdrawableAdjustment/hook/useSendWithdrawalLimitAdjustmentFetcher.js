import { useContext, useState } from "react";
import { useAlert } from "react-alert";
import { useTranslation } from "react-i18next";
import { popBoxContext } from "../../../../components/context";
import { api_WithdrawalLimitAdjustment_Send } from "../../../../service/api/WithdrawalLimitAdjustment";
import { useGetCustAndWalletInfoFetcher } from "./useGetCustAndWalletInfoFetcher";

const useSendWithdrawalLimitAdjustmentFetcher = () => {
	const { t } = useTranslation();
	const { setPopBox } = useContext(popBoxContext);
	const alert = useAlert();
	const [loading, setLoading] = useState();

	const { getCustAndWalletInfo } = useGetCustAndWalletInfoFetcher();

	const sendWithdrawalLimitAdjustment = async ({
		userName,
		adjustType,
		amount,
		memo
	}) => {
		setLoading(true);
		try {
			const { custId } = await getCustAndWalletInfo(userName);

			await api_WithdrawalLimitAdjustment_Send({
				custId,
				adjustType,
				amount,
				memo
			});

			alert.success(t("Alert.Success"));
			setPopBox({
				isOpen: false
			});
		} catch (error) {
			alert.error(error.message || t("Error.DefaultError"));
		}

		setLoading(false);
	};

	return { loading, sendWithdrawalLimitAdjustment };
};

export { useSendWithdrawalLimitAdjustmentFetcher };
