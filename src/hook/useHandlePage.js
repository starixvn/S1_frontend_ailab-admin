import { useState } from "react";

const initValue = { currentPage: 1, pageSize: 10 };

const useHandlePage = ({ callback }) => {
	const [pageData, setPageData] = useState(initValue);

	const clickPageNumber = ({ pageNumber, execCallback = true }) => {
		setPageData(prev => ({ ...prev, currentPage: pageNumber }));

		if (execCallback) {
			callback({ currentPage: pageNumber, pageSize: pageData.pageSize });
		}
	};

	const onSelectEntry = pageSizeData => {
		setPageData({ currentPage: 1, pageSize: pageSizeData.value });
		callback({ currentPage: 1, pageSize: pageSizeData.value });
	};

	return {
		currentPage: pageData.currentPage,
		pageSize: pageData.pageSize,
		clickPageNumber,
		onSelectEntry
	};
};

export { useHandlePage };
