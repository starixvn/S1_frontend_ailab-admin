import axios from "axios";
import config from "../../config";

const rootURL = config.apiURL;

export const homeRequest = axios.create({
	withCredentials: true,
	baseURL: `${rootURL}/api/home`
});

export const commonRequest = axios.create({
	withCredentials: true,
	baseURL: `${rootURL}/api/Common`
});

export const personalMessageRequest = axios.create({
	withCredentials: true,
	baseURL: `${rootURL}/api/PersonalMessage`
});

export const getAllDataRequest = axios.create({
	withCredentials: true,
	baseURL: `${rootURL}/apiV2/GetAllData`
});

export const enumRequest = axios.create({
	withCredentials: true,
	baseURL: `${rootURL}/apiV2/Enum`
});

export const apiV2Request = axios.create({
	withCredentials: true,
	baseURL: `${rootURL}/apiV2`
});

export const apiRequest = axios.create({
	withCredentials: true,
	baseURL: `${rootURL}/api`
});

export const permissionRequest = axios.create({
	withCredentials: true,
	baseURL: `${rootURL}/ApiV2/Permission`
});
