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
	userBetLimit: {
		root: `${siteInfo.newSitePrefixUrl}/CustManage/UserBetLimit`
	},
	depositList: {
		root: `${siteInfo.newSitePrefixUrl}/finance/depositList`
	},
	depositDetail: {
		root: `${siteInfo.newSitePrefixUrl}/finance/depositDetail/:transId`
	},
	dashboard: {
		root: "dashboard"
	},
	memberInformation: {
		root: `${siteInfo.newSitePrefixUrl}/member/memberDetail/:id`
	},
	memberList: {
		root: `${siteInfo.newSitePrefixUrl}/Member/MemberList`
	},
	withdrawalListing: {
		root: `${siteInfo.newSitePrefixUrl}/Finance/WithdrawalList`
	},
	withdrawableAdjustment: {
		root: `${siteInfo.newSitePrefixUrl}/Finance/WithdrawalLimitAdjust`
	},
	withdrawalSetting: {
		root: `${siteInfo.newSitePrefixUrl}/Member/WithdrawalKYCControl`
	},
	withdrawalTimeReport: {
		root: `${siteInfo.newSitePrefixUrl}/Finance/withdrawalTimeReport`
	},
	changeVipLevel: {
		root: `${siteInfo.newSitePrefixUrl}/Member/ChangeVipLevelBatch`
	},
	withdrawalDetail: {
		root: `${siteInfo.newSitePrefixUrl}/Finance/WithdrawalDetail/:id`
	},
	TeleCSD: {
		root: `${siteInfo.newSitePrefixUrl}/CustManage/TeleCSD`
	}
};
