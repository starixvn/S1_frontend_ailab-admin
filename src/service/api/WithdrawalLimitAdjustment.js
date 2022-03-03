import { apiV2Request } from "./base";

export const api_WithdrawalLimitAdjustment_GetCustAndWalletInfo = ({
	siteId = "",
	userName = "",
	sabaId = ""
}) =>
	apiV2Request.post("/WithdrawalLimitAdjustment/GetCustAndWalletInfo", {
		siteId,
		userName,
		sabaId
	});
