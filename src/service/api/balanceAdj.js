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

// {
//   "option": 1,
//   "optSite": 0,
//   "withdrawalLimitOption": 0,
//   "ContentType": "string",
//   "ContentDisposition": "string",
//   "Headers": {
//     "Item": [
//       "string"
//     ],
//     "ContentLength": 0
//   },
//   "Length": 0,
//   "Name": "string",
//   "FileName": "string",
//   "withdrawal": 0,
//   "bonusCode": "string"
// }

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
