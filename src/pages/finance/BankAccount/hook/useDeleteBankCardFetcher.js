import { useState } from "react";
import { useAlert } from "react-alert";
import { useTranslation } from "react-i18next";
import { useMounted } from "../../../../hook";
import { api_BankCardManagement_DeleteBankCard } from "../../../../service/api/bankCardManagement";

const useDeleteBankCardFetcher = () => {
	const { t } = useTranslation();
	const isMountedRef = useMounted();
	const alert = useAlert();
	const [loading, setLoading] = useState(false);

	const deleteBankCard = async bankId => {
		setLoading(true);

		try {
			await api_BankCardManagement_DeleteBankCard(bankId);

			if (!isMountedRef) {
				return;
			}
			alert.success(t("Alert.Success"));
		} catch (error) {
			alert.error(error.message || t("Error.DefaultError"));
		}

		setLoading(false);
	};
	return { loading, deleteBankCard };
};

export { useDeleteBankCardFetcher };
