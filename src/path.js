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
	adjustmentListing: {
		root: `${siteInfo.newSitePrefixUrl}/Finance/AdjustmentListing`
	},

	personalMessage: {
		root: `${siteInfo.newSitePrefixUrl}/Message/PersonalMsgBatch`
	},
	registrationManagement: {
		root: `${siteInfo.newSitePrefixUrl}/CustManage/RegistrationManagement`
	},
	depositList: {
		root: `${siteInfo.newSitePrefixUrl}/finance/depositList`
	},
	dashboard: {
		root: "dashboard"
	},
	memberList: {
		root: `${siteInfo.newSitePrefixUrl}/Member/MemberList`
	},
	withdrawalListing: {
		root: `${siteInfo.newSitePrefixUrl}/Finance/WithdrawalList`
	},
	withdrawalSetting: {
		root: `${siteInfo.newSitePrefixUrl}/Member/WithdrawalKYCControl`
	},
	changeVipLevel: {
		root: `${siteInfo.newSitePrefixUrl}/Member/ChangeVipLevelBatch`
	}
};
