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
	apiV2Request.post("/Withdrawal/Export", {
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
