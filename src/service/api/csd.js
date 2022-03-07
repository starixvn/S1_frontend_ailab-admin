import { apiV2Request } from "./base";

export const api_CSD_TagManagement_EditTag = ({
	id,
	tagName,
	tagColour,
	description
}) =>
	apiV2Request.post("/TagManagement/EditTagManagement", {
		id,
		tagName,
		tagColour,
		description
	});
export const api_CSD_TagManagement_SetTagStatus = ({ id }) =>
	apiV2Request.post("/TagManagement/SetTagStatus", {
		id
	});

export const api_CSD_TagManagement_GetTagList = ({
	pageNumber,
	pageSize,
	status
}) =>
	apiV2Request.post("/TagManagement/GetTagList", {
		pageNumber,
		pageSize,
		status
	});
