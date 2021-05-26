import axios from "axios";
import { defMenuCategory } from "./datas/menu";

const SiteURL =
	process.env.NODE_ENV === "production"
		? {
				apiURL: ""
		  }
		: {
				apiURL: "http://admin.n88dev.com"
		  };

axios.defaults.baseURL = SiteURL.apiURL;

export default SiteURL;

export const siteInfo = {
	langList: ["en"],
	defaultLang: "en",
	defaultIndex: "Home/DashboardNew",
	defaultCategory: defMenuCategory.Home,
	defaultFuncKey: "Home/DashboardNew"
};
