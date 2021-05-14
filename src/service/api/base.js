import axios from "axios";
import config from "../../config";

const rootURL = config.apiURL;

export const homeRequest = axios.create({
	withCredentials: true,
	baseURL: `${rootURL}/api/Home`
});
