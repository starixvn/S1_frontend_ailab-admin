import { useState } from "react";
import { useAlert } from "react-alert";
import { useTranslation } from "react-i18next";
import { api_registrationManagementRequest_DeleteRegLiveStatusNote } from "../../../../service/api/registrationManagement";

const useDeleteRegLiveStatusNoteFetcher = () => {
	const { t } = useTranslation();

	const alert = useAlert();

	const [loading, setLoading] = useState(false);

	const deleteRegLiveStatusNote = async ({ id, custId }) => {
		setLoading(true);

		try {
			await api_registrationManagementRequest_DeleteRegLiveStatusNote({
				id,
				custId
			});

			alert.success("success");
		} catch (error) {
			alert.error(error.message || t("Error.DefaultError"));
		}

		setLoading(false);
	};

	return { loading, deleteRegLiveStatusNote };
};

export { useDeleteRegLiveStatusNoteFetcher };
