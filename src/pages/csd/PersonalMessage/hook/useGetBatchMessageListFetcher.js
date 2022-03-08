import { useState } from "react";
import { useMounted } from "../../../../hook";
import { api_personalMessage_GetBatchMessageList } from "../../../../service/api/personalMessage";

const useGetBatchMessageListFetcher = () => {
	const isMountedRef = useMounted();

	const [loading, setLoading] = useState(false);
	const [batchMessageList, setBatchMessageList] = useState([]);
	const [totalPages, setTotalPages] = useState(0);

	const getBatchMessageList = async ({
		siteId,
		startDate,
		endDate,
		currentPage = 1,
		pageSize = 10
	}) => {
		setLoading(true);

		try {
			const data = await api_personalMessage_GetBatchMessageList({
				pageNumber: currentPage,
				siteIds: [siteId],
				startDate,
				endDate,
				pageSize
			});

			if (!isMountedRef) {
				return;
			}

			const results = data?.data ?? [];
			setBatchMessageList([...results]);
			setTotalPages(data.totalPages);
		} catch (error) {
			setBatchMessageList([]);
		}

		setLoading(false);
	};

	return {
		loading,
		totalPages,
		batchMessageList,
		getBatchMessageList
	};
};

export { useGetBatchMessageListFetcher };
