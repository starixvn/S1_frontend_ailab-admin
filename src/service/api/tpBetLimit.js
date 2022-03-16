import { tpBetLimitRequest } from "./base";

export const api_tpBetLimitRequest_GetList = async ({
	currencyIds,
	pageNumber,
	pageSize,
	siteIds,
	userName,
	startDate,
	endDate
}) => {
	const { data } = await tpBetLimitRequest.post("/GetList", {
		currencyIds,
		pageNumber,
		pageSize,
		siteIds,
		userName: userName !== "" ? userName : null,
		startDate,
		endDate
	});

	if (data.errorCode !== 0) {
		throw new Error(data.message);
	}

	return data;
};

export const api_tpBetLimitRequest_Delete = async custId => {
	const { data } = await tpBetLimitRequest.post("/Delete", { custId });

	if (data.errorCode !== 0) {
		throw new Error(data.message);
	}
};

export const api_tpBetLimitRequest_Set = async ({
	userName,
	siteId,
	betSetting
}) => {
	const { data } = await tpBetLimitRequest.post("/Set", {
		userName,
		siteId,
		betSetting
	});

	if (data.errorCode !== 0) {
		throw new Error(data.message);
	}
};

export const api_tpBetLimitRequest_GetByCustId = async custId => {
	const { data } = await tpBetLimitRequest.post("/GetByCustId", { custId });

	if (data.errorCode !== 0) {
		throw new Error(data.message);
	}

	return data?.data ?? {};
};
