import { permissionRequest } from "./base";

export const api_permission_GetUserMenu = () =>
	permissionRequest.post("/GetUserMenu");
