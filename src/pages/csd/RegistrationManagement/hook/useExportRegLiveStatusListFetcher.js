import { useAlert } from "react-alert";
import { useTranslation } from "react-i18next";
import { downloadExcelFile } from "../../../../components/common";
import { useMounted } from "../../../../hook";
import { api_registrationManagementRequest_ExportRegLiveStatusList } from "../../../../service/api/registrationManagement";

const useExportRegLiveStatusListFetcher = () => {
	const { t } = useTranslation();
	const isMountedRef = useMounted();
	const alert = useAlert();

	const exportRegLiveStatusList = async form => {
		try {
			const response = await api_registrationManagementRequest_ExportRegLiveStatusList(
				form
			);

			if (!isMountedRef) {
				return;
			}

			downloadExcelFile(response, "RegistrationManagementReport");
		} catch (error) {
			alert.error(error.message || t("Error.DefaultError"));
		}
	};

	return { exportRegLiveStatusList };
};

export { useExportRegLiveStatusListFetcher };
