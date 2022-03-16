import { apiV2Request } from "./base";

export const api_TeleCSD_GetTeleCSDList = ({
	dormantUser,
	deposit,
	startDate,
	endDate,
	siteIds,
	currencyIds,
	callOut,
	pageNumber,
	pageSize
}) =>
	apiV2Request.post("/TeleCSD/GetTeleCSDList", {
		dormantUser,
		deposit,
		startDate,
		endDate,
		siteIds,
		currencyIds,
		callOut,
		pageNumber,
		pageSize
	});
export const api_TeleCSD_Update = ({ custId, siteId }) =>
	apiV2Request.post("/TeleCSD/Update", {
		custId,
		siteId
	});

export const api_TeleCSD_ExportTeleCSDList = ({
	dormantUser,
	deposit,
	startDate,
	endDate,
	siteIds,
	currencyIds,
	callOut
}) =>
	apiV2Request.post(
		"/TeleCSD/ExportTeleCSDList",
		{
			dormantUser,
			deposit,
			startDate,
			endDate,
			siteIds,
			currencyIds,
			callOut
		},
		{ responseType: "blob" }
	);
