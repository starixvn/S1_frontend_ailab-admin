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
