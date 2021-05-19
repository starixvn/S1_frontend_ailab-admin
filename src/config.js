import axios from "axios";

const SiteURL =
	process.env.NODE_ENV === "production"
		? {
				apiURL: ""
		  }
		: {
				apiURL: "http://admin.n88dev.com"
		  };

axios.defaults.baseURL = SiteURL.apiURL;

export const siteInfo = {
	langList: ["en"],
	defaultLang: "en"
};
