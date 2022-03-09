import { useState } from "react";
import { useAlert } from "react-alert";
import { useTranslation } from "react-i18next";
import { useMounted } from "../../../../hook";
import { api_personalMessage_DeleteBatchMessage } from "../../../../service/api/personalMessage";

const useDeleteBatchMessageFetcher = () => {
	const { t } = useTranslation();
	const isMountedRef = useMounted();
	const alert = useAlert();
	const [loading, setLoading] = useState(false);

	const deleteBatchMessage = async batchId => {
		setLoading(true);

		try {
			await api_personalMessage_DeleteBatchMessage(batchId);

			if (!isMountedRef) {
				return;
			}

			alert.success(t("Alert.Success"));
		} catch (error) {
			alert.error(error.message || t("Error.DefaultError"));
		}

		setLoading(false);
	};

	return { loading, deleteBatchMessage };
};

export { useDeleteBatchMessageFetcher };
