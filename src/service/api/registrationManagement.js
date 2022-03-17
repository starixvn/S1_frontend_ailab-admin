import { registrationManagementRequest } from "./base";

export const api_registrationManagementRequest_GetRegLiveStatusList = async ({
	pageNumber,
	pageSize,
	siteIds,
	currencyId,
	depositStatus,
	status,
	user,
	sort,
	startDate,
	endDate,
	affiliatesCode,
	agentCodeType
}) => {
	const { data } = await registrationManagementRequest.post(
		"/GetRegLiveStatusList",
		{
			pageNumber,
			pageSize,
			siteIds,
			currencyId,
			depositStatus,
			status,
			user,
			sort,
			startDate,
			endDate,
			affiliatesCode,
			agentCodeType
		}
	);

	if (data.errorCode !== 0) {
		throw new Error(data.message);
	}

	return data;
};

export const api_registrationManagementRequest_ExportRegLiveStatusList = async ({
	siteIds,
	currencyId,
	depositStatus,
	status,
	user,
	sort,
	startDate,
	endDate,
	affiliatesCode,
	agentCodeType
}) => {
	const response = await registrationManagementRequest.post(
		"/ExportRegLiveStatusList",
		{
			siteIds,
			currencyId,
			depositStatus,
			status,
			user,
			sort,
			startDate,
			endDate,
			affiliatesCode,
			agentCodeType
		},
		{ responseType: "blob" }
	);

	return response;
};

export const api_registrationManagementRequest_SetRegLiveStatus = async ({
	siteId,
	custId,
	status
}) => {
	const { data } = await registrationManagementRequest.post(
		"/SetRegLiveStatus",
		{
			siteId,
			custId,
			status
		}
	);

	if (data.errorCode !== 0) {
		throw new Error(data.message);
	}
};

export const api_registrationManagementRequest_AddRegLiveStatusNote = async ({
	custId,
	note
}) => {
	const { data } = await registrationManagementRequest.post(
		"/AddRegLiveStatusNote",
		{
			custId,
			note
		}
	);

	if (data.errorCode !== 0) {
		throw new Error(data.message);
	}
};

export const api_registrationManagementRequest_GetRegLiveStatusNotes = async custId => {
	const { data } = await registrationManagementRequest.post(
		"/GetRegLiveStatusNotes",
		{
			custId
		}
	);

	if (data.errorCode !== 0) {
		throw new Error(data.message);
	}

	return data?.data ?? [];
};

export const api_registrationManagementRequest_DeleteRegLiveStatusNote = async ({
	id,
	custId
}) => {
	const { data } = await registrationManagementRequest.post(
		"/DeleteRegLiveStatusNote",
		{
			id,
			custId
		}
	);

	if (data.errorCode !== 0) {
		throw new Error(data.message);
	}
};
