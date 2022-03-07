/* eslint-disable consistent-return */
import { useState } from "react";
import { useAlert } from "react-alert";
import { useTranslation } from "react-i18next";
import { useMounted } from "../../../../hook";
import { api_personalMessage_GetBatchMessage } from "../../../../service/api/personalMessage";

const useGetBatchMessageFetcher = () => {
	const { t } = useTranslation();
	const isMountedRef = useMounted();
	const alert = useAlert();
	const [loading, setLoading] = useState(false);
	const [batchMessage, setBatchMessage] = useState({});

	const getBatchMessage = async batchId => {
		let data = {};
		setLoading(true);
		try {
			const response = await api_personalMessage_GetBatchMessage(batchId);

			if (!isMountedRef) {
				return;
			}

			data = response?.data ?? {};

			setBatchMessage(response?.data ?? {});
		} catch (error) {
			alert.error(error.message || t("Error.DefaultError"));
		}

		setLoading(false);

		return data;
	};

	return { loading, batchMessage, getBatchMessage };
};

export { useGetBatchMessageFetcher };
