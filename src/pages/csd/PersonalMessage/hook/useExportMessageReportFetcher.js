import { useAlert } from "react-alert";
import { useTranslation } from "react-i18next";
import { useMounted } from "../../../../hook";
import { api_personalMessage_ExportSendMessageBatchResultReport } from "../../../../service/api/personalMessage";

const useExportMessageReportFetcher = () => {
	const { t } = useTranslation();
	const isMountedRef = useMounted();
	const alert = useAlert();

	const exportMessageReport = async batchId => {
		try {
			const data = await api_personalMessage_ExportSendMessageBatchResultReport(
				batchId
			);

			if (!isMountedRef) {
				return;
			}

			const blob = new Blob([data], {
				type:
					"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
			});

			const url = window.URL.createObjectURL(blob);

			const link = document.createElement("a");
			link.href = url;
			link.download = "PersonalMessageReport.xlsx";

			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		} catch (error) {
			alert.error(error.message || t("Error.DefaultError"));
		}
	};

	return { exportMessageReport };
};

export { useExportMessageReportFetcher };
