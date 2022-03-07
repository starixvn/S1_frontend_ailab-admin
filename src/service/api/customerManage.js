import { customerManageRequest } from "./base";

export const api_customerManage_GetCustInfoList = ({
	pageNumber,
	pageSize,
	siteIds,
	currencyIds,
	startDate,
	endDate,
	birDate,
	birMonth,
	birYear,
	userName,
	accountName,
	loginIp,
	tpUserName,
	email,
	phoneNo,
	affCode,
	bankAccountNumber,
	statuses
}) =>
	customerManageRequest.post("/GetCustInfoList", {
		pageNumber,
		pageSize,
		siteIds,
		currencyIds,
		startDate: startDate || null,
		endDate: endDate || null,
		birDate,
		birMonth,
		birYear,
		userName: userName || null,
		accountName: accountName || null,
		loginIp: loginIp || null,
		tpUserName: tpUserName || null,
		email: email || null,
		phoneNo: phoneNo || null,
		affCode: affCode || null,
		bankAccountNumber: bankAccountNumber || null,
		statuses
	});
