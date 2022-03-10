import { useContext, useState } from "react";
import { useAlert } from "react-alert";
import { useTranslation } from "react-i18next";
import { popBoxContext } from "../../../../components/context";
import { api_registrationManagementRequest_SetRegLiveStatus } from "../../../../service/api/registrationManagement";

const useSetRegLiveStatusFetcher = () => {
	const { t } = useTranslation();
	const { setPopBox } = useContext(popBoxContext);

	const alert = useAlert();

	const [loading, setLoading] = useState(false);

	const setRegLiveStatus = async ({ siteId, custId, status }) => {
		setLoading(true);
		try {
			await api_registrationManagementRequest_SetRegLiveStatus({
				siteId,
				custId,
				status
			});

			alert.success("success");
			setPopBox({ isOpen: false });
		} catch (error) {
			alert.error(error.message || t("Error.DefaultError"));
		}

		setLoading(false);
	};
	return { loading, setRegLiveStatus };
};

export { useSetRegLiveStatusFetcher };
