import { useContext, useState } from "react";
import { useAlert } from "react-alert";
import { useTranslation } from "react-i18next";
import { popBoxContext } from "../../../../components/context";
import { api_personalMessage_UpdateBatchMessage } from "../../../../service/api/personalMessage";

const useUpdateBatchMessageFetcher = () => {
	const { t } = useTranslation();
	const alert = useAlert();
	const { setPopBox } = useContext(popBoxContext);

	const [loading, setLoading] = useState(false);

	const updateBatchMessage = async (form, batchId) => {
		setLoading(true);

		const msg = form?.personalMsg ?? {};

		const languageDatas = Object.keys(msg).map(lang => ({
			lang,
			message: {
				title: msg[lang].Title,
				content: msg[lang].Content,
				popupMessage: msg[lang].PopupMessage
			}
		}));

		try {
			const response = await api_personalMessage_UpdateBatchMessage({
				batchId,
				isPopup: form?.IsPopup,
				languageDatas
			});

			if (response?.data?.message) {
				alert.success(response?.data.message);
			}

			setPopBox(false);
		} catch (error) {
			alert.error(error.message || t("Error.DefaultError"));
		}

		setLoading(false);
	};

	return { loading, updateBatchMessage };
};

export { useUpdateBatchMessageFetcher };
