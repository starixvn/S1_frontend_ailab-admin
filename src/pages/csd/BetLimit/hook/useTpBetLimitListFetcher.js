import { useState } from "react";
import { useMounted } from "../../../../hook";
import { api_tpBetLimitRequest_GetList } from "../../../../service/api/tpBetLimit";

const useTpBetLimitListFetcher = () => {
	const isMountedRef = useMounted();
	const [loading, setLoading] = useState();
	const [betLimitList, setBetLimitList] = useState([]);
	const [totalPages, setTotalPages] = useState(0);
	const [rowCount, setRowCount] = useState(0);

	const getTpBetLimitList = async form => {
		setLoading(true);

		try {
			const response = await api_tpBetLimitRequest_GetList(form);

			if (!isMountedRef) {
				return;
			}

			const results = response?.data ?? [];
			setBetLimitList([...results]);
			setTotalPages(response.totalPages);
			setRowCount(response.rowCount);
		} catch (error) {
			setBetLimitList([]);
		}

		setLoading(false);
	};

	return {
		loading,
		totalPages,
		rowCount,
		betLimitList,
		getTpBetLimitList
	};
};

export { useTpBetLimitListFetcher };
