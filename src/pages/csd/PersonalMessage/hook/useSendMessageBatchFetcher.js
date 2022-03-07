import { useContext, useState } from "react";
import { useAlert } from "react-alert";
import { useTranslation } from "react-i18next";
import {
	allSiteListContext,
	popBoxContext
} from "../../../../components/context";
import { useLanguageState } from "../../../../hook";
import { api_personalMessage_SendMessageBatch } from "../../../../service/api/personalMessage";
import { MODE } from "../def";

const useSendMessageBatchFetcher = () => {
	const { t } = useTranslation();
	const alert = useAlert();
	const { setPopBox } = useContext(popBoxContext);

	const [loading, setLoading] = useState(false);
	const { allSiteList, siteId } = useContext(allSiteListContext);
	const { languageList } = useLanguageState({
		siteId,
		allSiteList
	});

	const sendMessageBatch = async form => {
		setLoading(true);

		try {
			const formData = new FormData();
			const msg = form?.personalMsg ?? {};

			languageList.forEach(lang => {
				if (
					!msg[lang]?.PopupMessage &&
					!msg[lang]?.Title &&
					!msg[lang]?.Content
				) {
					msg[lang] = {
						PopupMessage: form.personalMsg.en.PopupMessage,
						Title: form.personalMsg.en.Title,
						Content: form.personalMsg.en.Content
					};
				}
			});

			if (form.mode === MODE.ONE) {
				formData.append("accountStatus", form.accountStatus);
				formData.append("currency", form.currency);
			} else if (form.mode === MODE.TWO) {
				const file = document.getElementById("uploadfile").files[0];

				formData.append("accountStatus", 0);
				formData.append("currency", 0);
				formData.append("excelUpload", file, file.name);
			}

			formData.append("optSite", form.optSite);
			formData.append("IsPopup", form.IsPopup);
			formData.append("personalMsg", JSON.stringify(msg));

			const response = await api_personalMessage_SendMessageBatch(
				formData
			);

			if (response?.data?.message) {
				alert.success(response?.data.message);
			}

			setPopBox(false);
		} catch (error) {
			alert.error(error.message || t("Error.DefaultError"));
		}

		setLoading(false);
	};

	return { loading, sendMessageBatch };
};

export { useSendMessageBatchFetcher };
