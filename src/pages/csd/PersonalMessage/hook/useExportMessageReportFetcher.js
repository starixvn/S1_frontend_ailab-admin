import { useAlert } from "react-alert";
import { useTranslation } from "react-i18next";
import { downloadExcelFile } from "../../../../components/common";
import { useMounted } from "../../../../hook";
import { api_personalMessage_ExportSendMessageBatchResultReport } from "../../../../service/api/personalMessage";

const useExportMessageReportFetcher = () => {
	const { t } = useTranslation();
	const isMountedRef = useMounted();
	const alert = useAlert();

	const exportMessageReport = async batchId => {
		try {
			const response = await api_personalMessage_ExportSendMessageBatchResultReport(
				batchId
			);

			if (!isMountedRef) {
				return;
			}

			downloadExcelFile(response, "PersonalMessageReport");
		} catch (error) {
			alert.error(error.message || t("Error.DefaultError"));
		}
	};

	return { exportMessageReport };
};

export { useExportMessageReportFetcher };
