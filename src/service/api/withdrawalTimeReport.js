import { apiV2Request } from "./base";

export const api_Finance_WithdrawalTimeReport_GetList = ({
	withdrawalId,
	startDate,
	endDate,
	siteIds,
	currencyId,
	status,
	pageNumber,
	pageSize
}) =>
	apiV2Request.post("/WithdrawalTimeReport/GetList", {
		withdrawalId,
		startDate,
		endDate,
		siteIds,
		currencyId,
		status,
		pageNumber,
		pageSize
	});

export const api_Finance_WithdrawalTimeReport_Export = ({
	withdrawalId,
	startDate,
	endDate,
	siteIds,
	currencyId,
	status
}) =>
	apiV2Request.post(
		"/WithdrawalTimeReport/Export",
		{
			withdrawalId,
			startDate,
			endDate,
			siteIds,
			currencyId,
			status
		},
		{ responseType: "blob" }
	);
