import { apiV2Request } from "./base";

export const api_Deposit_GetList = ({
	pageNumber,
	pageSize,
	siteIds,
	depositId: _depositId,
	userName: _userName,
	depositTypes,
	currencyIds,
	startDate,
	endDate,
	statuses,
	levelStatuses,
	amountType,
	amount: _amount
}) =>
	apiV2Request.post("/Deposit/GetList", {
		pageNumber,
		pageSize,
		siteIds,
		depositId: _depositId || null,
		userName: _userName || null,
		depositTypes,
		currencyIds,
		startDate,
		endDate,
		statuses,
		levelStatuses,
		amountType,
		amount: _amount || null
	});

export const api_Deposit_BatchRejected = ({ transIds }) =>
	apiV2Request.post("/Deposit/BatchRejected", { transIds });
