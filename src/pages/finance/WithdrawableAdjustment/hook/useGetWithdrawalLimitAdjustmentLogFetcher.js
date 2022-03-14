import { useState } from "react";
import { api_WithdrawalLimitAdjustment_GetLog } from "../../../../service/api/WithdrawalLimitAdjustment";

const useGetWithdrawalLimitAdjustmentLogFetcher = () => {
	const [loading, setLoading] = useState();
	const [logList, setLogList] = useState([]);
	const [totalPages, setTotalPages] = useState(0);
	const [rowCount, setRowCount] = useState(0);

	const getLog = async ({ userName, pageNumber, pageSize, siteId }) => {
		setLoading(true);

		try {
			const response = await api_WithdrawalLimitAdjustment_GetLog({
				userName,
				pageNumber,
				pageSize,
				siteId
			});

			const results = response?.data ?? [];
			setLogList([...results]);
			setTotalPages(response.totalPages);
			setRowCount(response.rowCount);
		} catch (error) {
			setLogList([]);
		}

		setLoading(false);
	};
	return { loading, logList, totalPages, rowCount, getLog };
};

export { useGetWithdrawalLimitAdjustmentLogFetcher };
