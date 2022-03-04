import { apiV2Request } from "./base";

export const defStatus = {
	All: 0,
	Enable: 1,
	Disable: 2
};

export const api_baseData_GetTagByStatus = () =>
	apiV2Request.post("/BaseData/GetTagByStatus", {
		status: defStatus.All
	});

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
