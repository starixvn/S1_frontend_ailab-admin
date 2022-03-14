import { apiV2Request } from "./base";

export const api_WithdrawalLimitAdjustment_GetCustAndWalletInfo = ({
	siteId,
	userName,
	sabaId
}) =>
	apiV2Request.post("/WithdrawalLimitAdjustment/GetCustAndWalletInfo", {
		siteId,
		userName,
		sabaId
	});

export const api_WithdrawalLimitAdjustment_GetLog = async ({
	pageNumber,
	pageSize,
	siteId,
	userName
}) => {
	const { data } = await apiV2Request.post(
		"/WithdrawalLimitAdjustment/GetLog",
		{
			pageNumber,
			pageSize,
			siteId,
			userName: userName === "" ? null : userName
		}
	);

	if (data.errorCode !== 0) {
		throw new Error(data.message);
	}

	return data ?? {};
};

export const api_WithdrawalLimitAdjustment_Send = async ({
	custId,
	adjustType,
	amount,
	memo
}) => {
	const { data } = await apiV2Request.post(
		"/WithdrawalLimitAdjustment/Submit",
		{
			custId,
			adjustType,
			amount,
			memo
		}
	);

	if (data.errorCode !== 0) {
		throw new Error(data.message);
	}
};
