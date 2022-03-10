import { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useTranslation } from "react-i18next";
import { api_registrationManagementRequest_GetRegLiveStatusNotes } from "../../../../service/api/registrationManagement";

const useGetRegLiveStatusNotesFetcher = custId => {
	const { t } = useTranslation();

	const alert = useAlert();

	const [regLiveStatusNotes, setRegLiveStatusNotes] = useState([]);
	const [loading, setLoading] = useState(false);

	const getRegLiveStatusNotes = async _custId => {
		setLoading(true);

		try {
			const data = await api_registrationManagementRequest_GetRegLiveStatusNotes(
				_custId
			);

			setRegLiveStatusNotes(data);
		} catch (error) {
			alert.error(error.message || t("Error.DefaultError"));
		}

		setLoading(false);
	};

	useEffect(() => {
		getRegLiveStatusNotes(custId);
	}, [custId]);

	return { loading, regLiveStatusNotes, getRegLiveStatusNotes };
};

export { useGetRegLiveStatusNotesFetcher };
