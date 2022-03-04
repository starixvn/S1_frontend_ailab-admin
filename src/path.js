import { siteInfo } from "./config";

export default {
	home: {
		root: "/"
	},
	login: {
		root: "login"
	},
	tagManagement: {
		root: `${siteInfo.newSitePrefixUrl}/CustManage/TagManagement`
	},
	depositList: {
		root: `${siteInfo.newSitePrefixUrl}/finance/depositList`
	},
	dashboard: {
		root: "dashboard"
	},
	memberList: {
		root: `${siteInfo.newSitePrefixUrl}/member/memberList`
	}
};
