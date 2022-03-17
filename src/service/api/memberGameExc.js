import { apiV2Request } from "./base";

export const api_CSD_TpDisable_GetList = ({
	pageNumber,
	pageSize,
	siteIds,
	userName,
	startDate,
	endDate
}) =>
	apiV2Request.post("/TpDisable/GetList", {
		pageNumber,
		pageSize,
		siteIds,
		userName,
		startDate,
		endDate
	});

export const api_CSD_TpDisable_GetByCustId = ({ custId }) =>
	apiV2Request.post("/TpDisable/GetByCustId", { custId });

export const api_CSD_TpDisable_Set = ({ userName, siteId, disableTpGame }) =>
	apiV2Request.post("/TpDisable/Set", {
		userName,
		siteId,
		disableTpGame
	});

export const api_CSD_TpDisable_Delete = ({ custId }) =>
	apiV2Request.post("/TpDisable/Delete", { custId });

export const api_CSD_TpDisable_UpdateStatus = ({ custId, status }) =>
	apiV2Request.post("/TpDisable/UpdateStatus", { custId, status });
