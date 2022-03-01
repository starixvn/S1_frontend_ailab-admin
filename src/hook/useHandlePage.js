import { useState } from "react";

const initValue = { page: 1, entries: 10 };

const useHandlePage = ({ callback }) => {
	const [pageData, setPageData] = useState(initValue);

	const clickPageNumber = pageNum => {
		setPageData(prev => ({ ...prev, page: pageNum }));
		callback({ page: pageNum });
	};

	const onSelectEntry = pageSizeData => {
		setPageData({ page: 1, entries: pageSizeData.value });
		callback({ page: 1, pageSize: pageSizeData.value });
	};

	return {
		currentPage: pageData.page,
		pageSize: pageData.entries,
		clickPageNumber,
		onSelectEntry
	};
};

export { useHandlePage };
