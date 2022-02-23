import { personalMessageRequest } from "./base";

export const api_personalMessage_GetBatchMessageList = ({
	pageNumber,
	siteIds,
	startDate,
	endDate
}) =>
	personalMessageRequest.post("/GetBatchMessageList", {
		pageNumber,
		pageSize: 10,
		siteIds,
		startDate,
		endDate
	});
