import { useState } from "react";
import { useAlert } from "react-alert";
import { useTranslation } from "react-i18next";
import { useMounted } from "../../../../hook";
import { api_tpBetLimitRequest_Delete } from "../../../../service/api/tpBetLimit";

const useDeleteBetLimitFetcher = () => {
	const { t } = useTranslation();
	const isMountedRef = useMounted();
	const alert = useAlert();
	const [loading, setLoading] = useState();

	const deleteBetLimit = async custId => {
		setLoading(true);

		try {
			await api_tpBetLimitRequest_Delete(custId);

			if (!isMountedRef) {
				return;
			}

			alert.success(t("Alert.Success"));
		} catch (error) {
			alert.error(error.message || t("Error.DefaultError"));
		}

		setLoading(false);
	};
	return { loading, deleteBetLimit };
};

export { useDeleteBetLimitFetcher };
