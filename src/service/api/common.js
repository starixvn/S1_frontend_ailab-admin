import { commonRequest } from "./base";

export const api_common_AdminUserSiteList = () =>
	commonRequest.post("/AdminUserSiteList");
