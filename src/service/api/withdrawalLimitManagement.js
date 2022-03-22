import { apiV2Request } from "./base";

export const api_WithdrawalLimit_GetList = async ({
	pageNumber,
	siteIds,
	pageSize,
	currencyIds
}) => {
	const { data } = await apiV2Request.post("/WithdrawalLimit/GetList", {
		pageNumber,
		siteIds,
		pageSize,
		currencyIds
	});

	if (data.errorCode !== 0) {
		throw new Error(data.message);
	}

	return data;
};

export const api_WithdrawalLimit_Create = async ({
	siteId,
	currencyId,
	withdrawalMin,
	withdrawalMax
}) => {
	const { data } = await apiV2Request.post("/WithdrawalLimit/Create", {
		siteId,
		currencyId,
		withdrawalMin,
		withdrawalMax
	});

	if (data.errorCode !== 0) {
		throw new Error(data.message);
	}

	return data;
};

export const api_WithdrawalLimit_Update = async ({
	siteId,
	currencyId,
	vipLevel,
	withdrawalMin,
	withdrawalMax
}) => {
	const { data } = await apiV2Request.post("/WithdrawalLimit/Update", {
		siteId,
		currencyId,
		vipLevel,
		withdrawalMin,
		withdrawalMax
	});

	if (data.errorCode !== 0) {
		throw new Error(data.message);
	}

	return data;
};

export const api_WithdrawalLimit_Delete = async ({
	siteId,
	currencyId,
	vipLevel
}) => {
	const { data } = await apiV2Request.post("/WithdrawalLimit/Delete", {
		siteId,
		currencyId,
		vipLevel
	});

	if (data.errorCode !== 0) {
		throw new Error(data.message);
	}

	return data;
};
