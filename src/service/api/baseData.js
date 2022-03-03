import { apiV2Request } from "./base";

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
