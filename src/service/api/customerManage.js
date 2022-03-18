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

export const api_customerManage_GetCustInfoDetail = ({ custId }) =>
	customerManageRequest.post("/GetCustInfoDetail", {
		custId
	});

export const api_customerManage_GetTagByCustId = ({ custId }) =>
	customerManageRequest.post("/GetTagByCustId", {
		custId
	});

export const api_customerManage_SetTag = ({ custId, tags }) =>
	customerManageRequest.post("/SetTag", {
		custId,
		tags
	});

export const api_customerManage_SetUnlock = ({ custId, reason }) =>
	customerManageRequest.post("/SetUnlock", { custId, reason });

export const api_customerManage_SetLock = ({ custId, reason }) =>
	customerManageRequest.post("/SetLock", { custId, reason });

export const api_customerManage_SetClose = ({ custId, reason }) =>
	customerManageRequest.post("/SetClose", { custId, reason });

export const api_customerManage_SetVipLevel = ({ custId, vipLevel }) =>
	customerManageRequest.post("/SetVipLevel", {
		custId,
		vipLevel
	});

export const api_customerManage_SetCustInfo = ({
	custId,
	level,
	fullName,
	birthday_Y,
	birthday_M,
	birthday_D,
	phone,
	eMail
}) =>
	customerManageRequest.post("/SetCustInfo", {
		custId,
		level,
		fullName,
		birthday_Y,
		birthday_M,
		birthday_D,
		phone,
		eMail
	});

export const api_customerManage_ResetProfile = ({ custId }) =>
	customerManageRequest.post("/ResetProfile", { custId });

export const api_customerManage_ResetPwd = ({ custId }) =>
	customerManageRequest.post("/ResetPwd", { custId });

export const api_customerManage_KickOut = ({ custId, reason }) =>
	customerManageRequest.post("/KickOut", { custId, reason });

export const api_customerManage_SetEnablePromotionStatus = ({
	custId,
	status
}) =>
	customerManageRequest.post("/SetEnablePromotionStatus", { custId, status });

export const api_customerManage_ResetCustBankInfo = ({ custId }) =>
	customerManageRequest.post("/ResetCustBankInfo", { custId });

export const api_customerManage_ResetCustUSDTInfo = ({ custId }) =>
	customerManageRequest.post("/ResetCustUSDTInfo", { custId });

export const api_customerManage_SetCustStatusSwitch = ({
	custId,
	option,
	status
}) =>
	customerManageRequest.post("/SetCustStatusSwitch", {
		custId,
		option,
		status
	});
