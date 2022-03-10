// /apiV2/RegistrationManagement/AddRegLiveStatusNote

import { useContext, useState } from "react";
import { useAlert } from "react-alert";
import { useTranslation } from "react-i18next";
import { popBoxContext } from "../../../../components/context";
import { api_registrationManagementRequest_AddRegLiveStatusNote } from "../../../../service/api/registrationManagement";

const useAddRegLiveStatusNoteFetcher = () => {
	const { t } = useTranslation();
	const { setPopBox } = useContext(popBoxContext);

	const alert = useAlert();

	const [loading, setLoading] = useState(false);

	const addRegLiveStatusNote = async ({ custId, note }) => {
		setLoading(true);
		try {
			await api_registrationManagementRequest_AddRegLiveStatusNote({
				custId,
				note
			});

			alert.success("success");
			setPopBox({ isOpen: false });
		} catch (error) {
			alert.error(error.message || t("Error.DefaultError"));
		}

		setLoading(false);
	};
	return { loading, addRegLiveStatusNote };
};

export { useAddRegLiveStatusNoteFetcher };
