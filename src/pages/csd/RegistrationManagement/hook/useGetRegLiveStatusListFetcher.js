import { useState } from "react";
import { useMounted } from "../../../../hook";
import { api_registrationManagementRequest_GetRegLiveStatusList } from "../../../../service/api/registrationManagement";

const useGetRegLiveStatusListFetcher = () => {
	const isMountedRef = useMounted();

	const [loading, setLoading] = useState();
	const [regLiveStatusList, setRegLiveStatusList] = useState([]);
	const [totalPages, setTotalPages] = useState(0);
	const [rowCount, setRowCount] = useState(0);

	const getRegLiveStatusList = async form => {
		setLoading(true);

		try {
			const response = await api_registrationManagementRequest_GetRegLiveStatusList(
				form
			);

			if (!isMountedRef) {
				return;
			}

			const results = response?.data ?? [];
			setRegLiveStatusList([...results]);
			setTotalPages(response.totalPages);
			setRowCount(response.rowCount);
		} catch (error) {
			setRegLiveStatusList([]);
		}

		setLoading(false);
	};
	return {
		loading,
		regLiveStatusList,
		totalPages,
		rowCount,
		getRegLiveStatusList
	};
};

export { useGetRegLiveStatusListFetcher };
