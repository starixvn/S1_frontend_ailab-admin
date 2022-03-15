import { apiV2Request } from "./base";

export const api_BankCardManagement_GetListBySiteId = async ({
	pageNumber,
	pageSize,
	siteIds,
	currencyIds,
	statuses
}) => {
	const { data } = await apiV2Request.post(
		"/BankCardManagement/GetListBySiteId",
		{
			pageNumber,
			pageSize,
			siteIds,
			currencyIds,
			statuses
		}
	);

	if (data.errorCode !== 0) {
		throw new Error(data.message);
	}

	const response = data ?? {};
	return response;
};

export const api_BankCardManagement_DeleteBankCard = async bankId => {
	const { data } = await apiV2Request.post("BankCardManagement/Delete", {
		bankId
	});
	if (data.errorCode !== 0) {
		throw new Error(data.message);
	}
};
