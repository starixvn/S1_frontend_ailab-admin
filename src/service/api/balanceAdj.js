import { apiV2Request } from "./base";

export const api_Finance_BalanceAdjustment_Add = ({
	custId,
	option,
	amount,
	withdrawalLimitAmount,
	withdrawalLimitOption,
	memo
}) =>
	apiV2Request.post("/BalanceAdjustment/Submit", {
		custId,
		option,
		amount,
		withdrawalLimitAmount,
		withdrawalLimitOption,
		memo
	});

export const api_Finance_BalanceAdjustment_AddBatch = formData =>
	apiV2Request.post("/BalanceAdjustment/SubmitBatch", formData, {
		headers: {
			"Content-Type": "multipart/form-data"
		}
	});

export const api_Finance_AdjustmentReport_GetList = ({
	pageNumber,
	pageSize,
	siteIds,
	currencyIds,
	userName,
	adjustTypes,
	startDate,
	endDate,
	transId
}) =>
	apiV2Request.post("/AdjustmentReport/GetList", {
		pageNumber,
		pageSize,
		siteIds,
		currencyIds,
		userName,
		adjustTypes,
		startDate,
		endDate,
		transId
	});
