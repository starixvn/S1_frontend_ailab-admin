import { apiV2Request } from "./base";

export const api_WithdrawalLimitCrypto_GetList = async ({
	pageNumber,
	siteIds,
	pageSize,
	currencyIds,
	networkType,
	cryptoCurrency
}) => {
	const { data } = await apiV2Request.post("/WithdrawalLimitCrypto/GetList", {
		pageNumber,
		siteIds,
		pageSize,
		currencyIds,
		networkType,
		cryptoCurrency
	});

	if (data.errorCode !== 0) {
		throw new Error(data.message);
	}

	return data;
};

export const api_WithdrawalLimitCrypto_Create = async ({
	siteId,
	currencyId,
	networkType,
	cryptoCurrency,
	withdrawalMin,
	withdrawalMax
}) => {
	const { data } = await apiV2Request.post("/WithdrawalLimitCrypto/Create", {
		siteId,
		currencyId,
		networkType,
		cryptoCurrency,
		withdrawalMin,
		withdrawalMax
	});

	if (data.errorCode !== 0) {
		throw new Error(data.message);
	}

	return data;
};

export const api_WithdrawalLimitCrypto_Update = async ({
	siteId,
	currencyId,
	vipLevel,
	networkType,
	cryptoCurrency,
	withdrawalMin,
	withdrawalMax
}) => {
	const { data } = await apiV2Request.post("/WithdrawalLimitCrypto/Update", {
		siteId,
		currencyId,
		vipLevel,
		networkType,
		cryptoCurrency,
		withdrawalMin,
		withdrawalMax
	});

	if (data.errorCode !== 0) {
		throw new Error(data.message);
	}

	return data;
};

export const api_WithdrawalLimitCrypto_Delete = async ({
	siteId,
	currencyId,
	vipLevel,
	networkType,
	cryptoCurrency
}) => {
	const { data } = await apiV2Request.post("/WithdrawalLimitCrypto/Delete", {
		siteId,
		currencyId,
		vipLevel,
		networkType,
		cryptoCurrency
	});

	if (data.errorCode !== 0) {
		throw new Error(data.message);
	}

	return data;
};
