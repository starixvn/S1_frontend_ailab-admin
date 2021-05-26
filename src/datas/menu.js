export const defMenuCategory = {
	Home: "Home",
	Reports: "Reports",
	CSD: "CSD",
	Finance: "Finance",
	Administration: "Administration",
	Marketing: "Marketing"
};

export default [
	{
		displayKey: "Menu.Home.Home",
		Icon: "home",
		Category: defMenuCategory.Home,
		Childs: [
			{
				displayKey: "Menu.Home.Dashboard",
				FuncKey: "Home/DashboardNew",
				Controller: "Home",
				Action: "DashboardNew",
				Icon: "",
				Childs: null
			}
		]
	},
	{
		displayKey: "Menu.Reports",
		Icon: "file-text",
		Category: defMenuCategory.Reports,
		Childs: [
			{
				displayKey: "Menu.WinLostReport",
				FuncKey: "LicWinLost/Report",
				Controller: "Report",
				Action: "LicWinLost",
				Icon: "",
				Childs: null
			},
			{
				displayKey: "Menu.MainFinancialReport",
				FuncKey: "Report/MainFinancialReport",
				Controller: "Report",
				Action: "MainFinancialReport",
				Icon: "",
				Childs: null
			},
			{
				displayKey: "Menu.DepositReport",
				FuncKey: "Report/DepositReport",
				Controller: "Report",
				Action: "DepositReport",
				Icon: "",
				Childs: null
			},
			{
				displayKey: "Menu.StatisticalReport",
				FuncKey: "Report/StatisticalReport",
				Controller: "Report",
				Action: "StatisticalReport",
				Icon: "",
				Childs: null
			},
			{
				displayKey: "Menu.CustomerStatisticalReport",
				FuncKey: "Report/CustomerStatisticalReport",
				Controller: "Report",
				Action: "CustomerStatisticalReport",
				Icon: "",
				Childs: null
			},
			{
				displayKey: "Menu.UserOnlineReport",
				FuncKey: "Report/UserOnlineReport",
				Controller: "Report",
				Action: "UserOnlineReport",
				Icon: "",
				Childs: null
			}
		]
	},
	{
		displayKey: "Menu.CSD",
		Icon: "briefcase",
		Category: defMenuCategory.CSD,
		Childs: [
			{
				displayKey: "Menu.CustomerAdministration",
				FuncKey: "CustManage/CustInfoList",
				Controller: "CustManage",
				Action: "CustInfoList",
				Icon: "",
				Childs: null
			},
			{
				displayKey: "Menu.Announcement",
				FuncKey: "Message/Announcement",
				Controller: "Message",
				Action: "Announcement",
				Icon: "",
				Childs: null
			},
			{
				displayKey: "Menu.PersonalMsgBatch",
				FuncKey: "Message/PersonalMsgBatch",
				Controller: "Message",
				Action: "PersonalMsgBatch",
				Icon: "",
				Childs: null
			},
			{
				displayKey: "Menu.ChangeVipLevelBatch",
				FuncKey: "Message/ChangeVipLevelBatch",
				Controller: "Message",
				Action: "ChangeVipLevelBatch",
				Icon: "",
				Childs: null
			},
			{
				displayKey: "Menu.WithdrawalKYCControl",
				FuncKey: "Message/WithdrawalKYCControl",
				Controller: "Message",
				Action: "WithdrawalKYCControl",
				Icon: "",
				Childs: null
			},
			{
				displayKey: "Menu.TeleCSD",
				FuncKey: "CustManage/TeleCSD",
				Controller: "CustManage",
				Action: "TeleCSD",
				Icon: "",
				Childs: null
			}
		]
	},
	{
		displayKey: "Menu.Finance",
		Icon: "dollar-sign",
		Category: defMenuCategory.Finance,
		Childs: [
			{
				displayKey: "Menu.BankCardManagement",
				FuncKey: "Finance/BankInfoList",
				Controller: "Finance",
				Action: "BankInfoList",
				Icon: "",
				Childs: null
			},
			{
				displayKey: "Menu.DepositRequest",
				FuncKey: "Finance/DepositList",
				Controller: "Finance",
				Action: "DepositList",
				Icon: "",
				Childs: null
			},
			{
				displayKey: "Menu.WithdrawalRequest",
				FuncKey: "Finance/WithdrawalList",
				Controller: "Finance",
				Action: "WithdrawalList",
				Icon: "",
				Childs: null
			},
			{
				displayKey: "Menu.BalanceAdjustment",
				FuncKey: "Finance/PaymentAdjustment",
				Controller: "Finance",
				Action: "PaymentAdjustment",
				Icon: "",
				Childs: null
			},
			{
				displayKey: "Menu.BalanceAdjustmentBatch",
				FuncKey: "Finance/BalanceAdjustmentBatch",
				Controller: "Finance",
				Action: "BalanceAdjustmentBatch",
				Icon: "",
				Childs: null
			},
			{
				displayKey: "Menu.WithdrawalLimitAdjust",
				FuncKey: "Finance/WithdrawalLimitAdjust",
				Controller: "Finance",
				Action: "WithdrawalLimitAdjust",
				Icon: "",
				Childs: null
			},
			{
				displayKey: "Menu.AdjustmentReport",
				FuncKey: "Finance/AdjustmentReport",
				Controller: "Finance",
				Action: "PaymentAdjustmentReport",
				Icon: "",
				Childs: null
			},
			{
				displayKey: "Menu.PaymentManagement",
				FuncKey: "Finance/PaymentManage",
				Controller: "Finance",
				Action: "PaymentManage",
				Icon: "",
				Childs: null
			},
			{
				displayKey: "Menu.DepositLimitManagement",
				FuncKey: "Finance/DepositLimitManage",
				Controller: "Finance",
				Action: "DepositLimitManagement",
				Icon: "",
				Childs: null
			},
			{
				displayKey: "Menu.ThirdPartyAdjustment",
				FuncKey: "Finance/ThirdPartyAdjustment",
				Controller: "Finance",
				Action: "ThirdPartyAdjustment",
				Icon: "",
				Childs: null
			}
		]
	},
	{
		displayKey: "Menu.Administration",
		Title: "Administration",
		Icon: "user",

		Category: defMenuCategory.Administration,
		Childs: [
			{
				displayKey: "Menu.GroupSetting",
				Title: "Group Setting",
				FuncKey: "Admin/GroupAuthoritySetting",
				Controller: "Admin",
				Action: "GroupAuthoritySetting",
				Icon: "",
				Childs: null
			},
			{
				displayKey: "Menu.UserSetting",
				Title: "User Setting",
				FuncKey: "Admin/UserAuthoritySetting",
				Controller: "Admin",
				Action: "UserAuthoritySetting",
				Icon: "",
				Childs: null
			}
		]
	},
	{
		displayKey: "Menu.Marketing",
		Title: "Marketing",
		Icon: "activity",
		Category: defMenuCategory.Marketing,
		Childs: [
			{
				displayKey: "Menu.PointLevelManagement",
				Title: "Point Level Management",
				FuncKey: "Marketing/PointLevelManagement",
				Controller: "Marketing",
				Action: "PointLevelManagement",
				Icon: "",
				Childs: null
			},
			{
				displayKey: "Menu.BonusManagement",
				Title: "Bonus Management",
				FuncKey: "Marketing/BonusManage",
				Controller: "Marketing",
				Action: "BonusManage",
				Icon: "",
				Childs: null
			},
			{
				displayKey: "BonusInfoReport",
				Title: "Bonus Report",
				FuncKey: "Marketing/BonusInfoReport",
				Controller: "Marketing",
				Action: "BonusInfoReport",
				Icon: "",
				Childs: null
			},
			{
				displayKey: "BonusImport",
				Title: "Bonus Import",
				FuncKey: "Marketing/BonusImport",
				Controller: "Marketing",
				Action: "BonusImport",
				Icon: "",
				Childs: null
			},
			{
				displayKey: "PendingBonus",
				Title: "Pending Bonus",
				FuncKey: "Marketing/PendingBonus",
				Controller: "Marketing",
				Action: "PendingBonus",
				Icon: "",
				Childs: null
			},
			{
				displayKey: "RebateInfoReport",
				Title: "Rebate Info",
				FuncKey: "Marketing/RebateInfoReport",
				Controller: "Marketing",
				Action: "RebateInfoReport",
				Icon: "",
				Childs: null
			},
			{
				displayKey: "RebateLogReport",
				Title: "Rebate Report",
				FuncKey: "Marketing/RebateLogReport",
				Controller: "Marketing",
				Action: "RebateLogReport",
				Icon: "",
				Childs: null
			},
			{
				displayKey: "ReferralManagement",
				Title: "Referral Management",
				FuncKey: "Marketing/ReferralManagement",
				Controller: "Marketing",
				Action: "ReferralManagement",
				Icon: "",
				Childs: null
			},
			{
				displayKey: "ReferralReport",
				Title: "Referral Report",
				FuncKey: "Marketing/ReferralReport",
				Controller: "Marketing",
				Action: "ReferralReport",
				Icon: "",
				Childs: null
			},
			{
				displayKey: "NewsManage",
				Title: "News Management",
				FuncKey: "Marketing/NewsManage",
				Controller: "Marketing",
				Action: "NewsManage",
				Icon: "",
				Childs: null
			},
			{
				displayKey: "BannerManagement",
				Title: "Banner Management",
				FuncKey: "Marketing/BannerManage",
				Controller: "Marketing",
				Action: "BannerManage",
				Icon: "",
				Childs: null
			},
			{
				displayKey: "DrawPrizeReport",
				Title: "Draw Prize Report",
				FuncKey: "Marketing/DrawPrizeReport",
				Controller: "Marketing",
				Action: "DrawPrizeReport",
				Icon: "",
				Childs: null
			},
			{
				displayKey: "GameCasinoManagement",
				Title: "Game Casino Management",
				FuncKey: "Marketing/GameCasinoManagement",
				Controller: "Marketing",
				Action: "GameCasinoManagement",
				Icon: "",
				Childs: null
			}
		]
	}
];
