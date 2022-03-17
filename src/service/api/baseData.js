import { apiV2Request } from "./base";

export const defStatus = {
	All: 0,
	Enable: 1,
	Disable: 2
};

export const api_BaseData_GetTagByStatus = status =>
	apiV2Request.post("/BaseData/GetTagByStatus", { status });

export const api_BaseData_GetBankInfoOffListByCustVerify = ({
	siteId = "",
	userName = "",
	sabaId = ""
}) =>
	apiV2Request.post("/BaseData/GetBankInfoOffListByCustVerify", {
		siteId,
		userName,
		sabaId
	});

export const api_BaseData_GetTpGameTypeListByCategory = async categoryId => {
	const { data } = await apiV2Request.post(
		"/BaseData/GetTpGameTypeListByCategory",
		{
			categoryId
		}
	);

	if (data.errorCode !== 0) {
		throw new Error(data.message);
	}
	return data?.data ?? [];
};

export const api_BaseData_GetPayList = ({ currencyId, payId }) =>
	apiV2Request.post("/BaseData/GetPayList", {
		currencyId,
		payId
	});

export const api_BaseData_GetBankInfoOffList = ({ currencyId, siteId }) =>
	apiV2Request.post("/BaseData/GetBankInfoOffList", {
		currencyId,
		siteId
	});

export const api_BaseData_GetCryptoPayList = ({ currencyId, channelName }) =>
	apiV2Request.post("/BaseData/GetCryptoPayList", {
		currencyId,
		channelName
	});
