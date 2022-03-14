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

export const api_Deposit_GetByTransId = ({ transId }) =>
	apiV2Request.post("/Deposit/GetByTransId", { transId });

export const api_Deposit_GetCommentByTransId = ({ transId }) =>
	apiV2Request.post("/Deposit/GetCommentByTransId", { transId });

export const api_Deposit_SendToNext = ({
	transId,
	actualDeposit,
	comment,
	action
}) =>
	apiV2Request.post("/Deposit/SendToNext", {
		transId,
		actualDeposit,
		comment,
		action
	});

export const api_Deposit_SetAmountByTransId = ({ transId, amount }) =>
	apiV2Request.post("/Deposit/SetAmountByTransId", { transId, amount });
