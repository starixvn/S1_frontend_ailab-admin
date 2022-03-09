import { apiV2Request } from "./base";

export const api_withdrawalKYC_GetList = siteId =>
	apiV2Request.post("/WithdrawalKYC/GetList", { siteId });

export const api_withdrawalKYC_Update = ({ siteId, currencyId, amount }) =>
	apiV2Request.post("/WithdrawalKYC/Update", { siteId, currencyId, amount });
