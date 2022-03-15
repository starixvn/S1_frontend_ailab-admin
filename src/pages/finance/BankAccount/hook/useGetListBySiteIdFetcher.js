import { useState } from "react";
import { useMounted } from "../../../../hook";
import { api_BankCardManagement_GetListBySiteId } from "../../../../service/api/bankCardManagement";

const useGetListBySiteIdFetcher = () => {
	const isMountedRef = useMounted();

	const [loading, setLoading] = useState();
	const [bankInfoList, setBankInfoList] = useState([]);
	const [totalPages, setTotalPages] = useState(0);
	const [rowCount, setRowCount] = useState(0);

	const getListBySiteId = async ({
		pageNumber,
		pageSize,
		siteIds,
		currencyIds,
		statuses
	}) => {
		setLoading(true);

		try {
			const response = await api_BankCardManagement_GetListBySiteId({
				pageNumber,
				pageSize,
				siteIds,
				currencyIds,
				statuses
			});

			if (!isMountedRef) {
				return;
			}

			const results = response?.data ?? [];
			setBankInfoList(results);
			setTotalPages(response.totalPages);
			setRowCount(response.rowCount);
		} catch (error) {
			setBankInfoList([]);
		}

		setLoading(false);
	};

	return { loading, bankInfoList, totalPages, rowCount, getListBySiteId };
};

export { useGetListBySiteIdFetcher };
