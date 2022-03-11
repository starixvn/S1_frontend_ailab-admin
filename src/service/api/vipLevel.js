import { apiV2Request } from "./base";

export const api_vipLevel_ChangeVipLevelBatch = formData =>
	apiV2Request.post("/VipLevel/ChangeVipLevelBatch", formData, {
		headers: {
			"Content-Type": "multipart/form-data"
		}
	});
