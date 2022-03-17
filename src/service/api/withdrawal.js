import { apiV2Request } from "./base";

export const api_withdrawal_GetList = ({
	pageNumber,
	pageSize,
	siteIds,
	withdrawalTypes,
	currencyIds,
	startDate,
	endDate,
	statuses,
	levelStatuses,
	amountType,
	amount,
	withdrawalId,
	userName
}) =>
	apiV2Request.post("/Withdrawal/GetList", {
		pageNumber,
		pageSize,
		siteIds,
		withdrawalTypes,
		currencyIds,
		startDate,
		endDate,
		statuses,
		levelStatuses,
		amountType,
		amount,
		withdrawalId: withdrawalId ?? null,
		userName: userName ?? null
	});

export const api_withdrawal_Export = ({
	pageNumber,
	pageSize,
	siteIds,
	withdrawalTypes,
	currencyIds,
	startDate,
	endDate,
	statuses,
	levelStatuses,
	amountType,
	amount,
	withdrawalId,
	userName
}) =>
	apiV2Request.post(
		"/Withdrawal/Export",
		{
			pageNumber,
			pageSize,
			siteIds,
			withdrawalTypes,
			currencyIds,
			startDate,
			endDate,
			statuses,
			levelStatuses,
			amountType,
			amount,
			withdrawalId: withdrawalId || null,
			userName: userName || null
		},
		{ responseType: "blob" }
	);

export const api_withdrawal_GetByTransId = ({ transId }) =>
	apiV2Request.post("/Withdrawal/GetByTransId", { transId });

export const api_withdrawal_GetCommentByTransId = ({ transId }) =>
	apiV2Request.post("/Withdrawal/GetCommentByTransId", { transId });

export const api_withdrawal_SendToNext = ({
	transId,
	comment,
	action,
	withdrawalInfo,
	withdrawalType,
	selId,
	channelId
}) =>
	apiV2Request.post("/Withdrawal/SendToNext", {
		transId,
		comment,
		action,
		withdrawalInfo,
		withdrawalType,
		selId,
		channelId
	});

export const api_withdrawal_UploadPicture = ({ transId, pic }) =>
	apiV2Request.post("/Withdrawal/UploadPicture", { transId, pic });

export const api_withdrawal_DeletePicture = ({ transId }) =>
	apiV2Request.post("/Withdrawal/DeletePicture", { transId });
