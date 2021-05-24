import { api_home_CheckSignIn } from "./api/home";

export const IS_LOGGED_IN = async () => {
	try {
		const res = await api_home_CheckSignIn();
		return res.data.errorCode === 0;
	} catch (error) {
		return false;
	}
};
