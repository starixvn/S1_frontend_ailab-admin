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
	personalMessage: {
		root: `${siteInfo.newSitePrefixUrl}/Message/PersonalMsgBatch`
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
