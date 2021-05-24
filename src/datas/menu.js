export default [
	{
		displayKey: "Menu.Reports",
		Title: "Reports",
		Icon: "icon-reports",
		Childs: [
			{
				displayKey: "",
				Title: "Win Lost",
				FuncKey: "LicWinLost/Report",
				Controller: "Report",
				Action: "LicWinLost",
				Icon: "",
				Roles: null,
				Childs: null
			},
			{
				displayKey: "",
				Title: "Main Financial Report",
				FuncKey: "Report/MainFinancialReport",
				Controller: "Report",
				Action: "MainFinancialReport",
				Icon: "",
				Roles: null,
				Childs: null
			},
			{
				displayKey: "",
				Title: "Deposit Report",
				FuncKey: "Report/DepositReport",
				Controller: "Report",
				Action: "DepositReport",
				Icon: "",
				Roles: null,
				Childs: null
			},
			{
				displayKey: "",
				Title: "Statistical Report",
				FuncKey: "Report/StatisticalReport",
				Controller: "Report",
				Action: "StatisticalReport",
				Icon: "",
				Roles: null,
				Childs: null
			},
			{
				displayKey: "",
				Title: "Customer Statistical Report",
				FuncKey: "Report/CustomerStatisticalReport",
				Controller: "Report",
				Action: "CustomerStatisticalReport",
				Icon: "",
				Roles: null,
				Childs: null
			},
			{
				displayKey: "",
				Title: "User Online Report",
				FuncKey: "Report/UserOnlineReport",
				Controller: "Report",
				Action: "UserOnlineReport",
				Icon: "",
				Roles: null,
				Childs: null
			}
		]
	},
	{
		displayKey: "Menu.CSD",
		Title: "CSD",
		Icon: "icon-csd",
		Roles: null,
		Childs: [
			{
				displayKey: "lbl_CustomerAdministration",
				Title: "Customer Administration",
				FuncKey: "CustManage/CustInfoList",
				Controller: "CustManage",
				Action: "CustInfoList",
				Icon: "",
				Roles: null,
				Childs: null
			},
			{
				displayKey: "lbl_Announcement",
				Title: "Announcement",
				FuncKey: "Message/Announcement",
				Controller: "Message",
				Action: "Announcement",
				Icon: "",
				Roles: null,
				Childs: null
			},
			{
				displayKey: "lbl_Announcement",
				Title: "Personal Msg Batch",
				FuncKey: "Message/PersonalMsgBatch",
				Controller: "Message",
				Action: "PersonalMsgBatch",
				Icon: "",
				Roles: null,
				Childs: null
			},
			{
				displayKey: "",
				Title: "Change Vip Level (Batch)",
				FuncKey: "Message/ChangeVipLevelBatch",
				Controller: "Message",
				Action: "ChangeVipLevelBatch",
				Icon: "",
				Roles: null,
				Childs: null
			},
			{
				displayKey: "",
				Title: "Withdrawal KYC Control",
				FuncKey: "Message/WithdrawalKYCControl",
				Controller: "Message",
				Action: "WithdrawalKYCControl",
				Icon: "",
				Roles: null,
				Childs: null
			},
			{
				displayKey: "",
				Title: "TeleCSD",
				FuncKey: "CustManage/TeleCSD",
				Controller: "CustManage",
				Action: "TeleCSD",
				Icon: "",
				Roles: null,
				Childs: null
			}
		]
	},
	{
		displayKey: "Menu.Finance",
		Title: "Finance",
		Icon: "icon-finance",
		Roles: null,
		Childs: [
			{
				displayKey: "lbl_BankCardList",
				Title: "Bank Card Management",
				FuncKey: "Finance/BankInfoList",
				Controller: "Finance",
				Action: "BankInfoList",
				Icon: "",
				Roles: null,
				Childs: null
			},
			{
				displayKey: "lbl_DepositRequest",
				Title: "Deposit Request",
				FuncKey: "Finance/DepositList",
				Controller: "Finance",
				Action: "DepositList",
				Icon: "",
				Roles: null,
				Childs: null
			},
			{
				displayKey: "lbl_WithdrawalRequest",
				Title: "Withdrawal Request",
				FuncKey: "Finance/WithdrawalList",
				Controller: "Finance",
				Action: "WithdrawalList",
				Icon: "",
				Roles: null,
				Childs: null
			},
			{
				displayKey: "",
				Title: "Balance Adjustment",
				FuncKey: "Finance/PaymentAdjustment",
				Controller: "Finance",
				Action: "PaymentAdjustment",
				Icon: "",
				Roles: null,
				Childs: null
			},
			{
				displayKey: "",
				Title: "Balance Adjustment (Batch)",
				FuncKey: "Finance/BalanceAdjustmentBatch",
				Controller: "Finance",
				Action: "BalanceAdjustmentBatch",
				Icon: "",
				Roles: null,
				Childs: null
			},
			{
				displayKey: "",
				Title: "WithdrawalLimit Adjustment",
				FuncKey: "Finance/WithdrawalLimitAdjust",
				Controller: "Finance",
				Action: "WithdrawalLimitAdjust",
				Icon: "",
				Roles: null,
				Childs: null
			},
			{
				displayKey: "",
				Title: "Adjustment Report",
				FuncKey: "Finance/AdjustmentReport",
				Controller: "Finance",
				Action: "PaymentAdjustmentReport",
				Icon: "",
				Roles: null,
				Childs: null
			},
			{
				displayKey: "",
				Title: "Payment Management",
				FuncKey: "Finance/PaymentManage",
				Controller: "Finance",
				Action: "PaymentManage",
				Icon: "",
				Roles: null,
				Childs: null
			},
			{
				displayKey: "",
				Title: "Deposit Limit Management",
				FuncKey: "Finance/DepositLimitManage",
				Controller: "Finance",
				Action: "DepositLimitManagement",
				Icon: "",
				Roles: null,
				Childs: null
			},
			{
				displayKey: "",
				Title: "3RD Funds Adjustment",
				FuncKey: "Finance/ThirdPartyAdjustment",
				Controller: "Finance",
				Action: "ThirdPartyAdjustment",
				Icon: "",
				Roles: null,
				Childs: null
			}
		]
	},
	{
		displayKey: "Menu.Administration",
		Title: "Administration",
		Icon: "icon-admin",
		Roles: null,
		Childs: [
			{
				displayKey: "lbl_GroupSetting",
				Title: "Group Setting",
				FuncKey: "Admin/GroupAuthoritySetting",
				Controller: "Admin",
				Action: "GroupAuthoritySetting",
				Icon: "",
				Roles: null,
				Childs: null
			},
			{
				displayKey: "lbl_UserSetting",
				Title: "User Setting",
				FuncKey: "Admin/UserAuthoritySetting",
				Controller: "Admin",
				Action: "UserAuthoritySetting",
				Icon: "",
				Roles: null,
				Childs: null
			}
		]
	},
	{
		displayKey: "Menu.Marketing",
		Title: "Marketing",
		Icon: "icon-marketing",
		Roles: null,
		Childs: [
			{
				displayKey: "PointLevelManagement",
				Title: "Point Level Management",
				FuncKey: "Marketing/PointLevelManagement",
				Controller: "Marketing",
				Action: "PointLevelManagement",
				Icon: "",
				Roles: null,
				Childs: null
			},
			{
				displayKey: "BonusManage",
				Title: "Bonus Management",
				FuncKey: "Marketing/BonusManage",
				Controller: "Marketing",
				Action: "BonusManage",
				Icon: "",
				Roles: null,
				Childs: null
			},
			{
				displayKey: "BonusInfoReport",
				Title: "Bonus Report",
				FuncKey: "Marketing/BonusInfoReport",
				Controller: "Marketing",
				Action: "BonusInfoReport",
				Icon: "",
				Roles: null,
				Childs: null
			},
			{
				displayKey: "BonusImport",
				Title: "Bonus Import",
				FuncKey: "Marketing/BonusImport",
				Controller: "Marketing",
				Action: "BonusImport",
				Icon: "",
				Roles: null,
				Childs: null
			},
			{
				displayKey: "PendingBonus",
				Title: "Pending Bonus",
				FuncKey: "Marketing/PendingBonus",
				Controller: "Marketing",
				Action: "PendingBonus",
				Icon: "",
				Roles: null,
				Childs: null
			},
			{
				displayKey: "RebateInfoReport",
				Title: "Rebate Info",
				FuncKey: "Marketing/RebateInfoReport",
				Controller: "Marketing",
				Action: "RebateInfoReport",
				Icon: "",
				Roles: null,
				Childs: null
			},
			{
				displayKey: "RebateLogReport",
				Title: "Rebate Report",
				FuncKey: "Marketing/RebateLogReport",
				Controller: "Marketing",
				Action: "RebateLogReport",
				Icon: "",
				Roles: null,
				Childs: null
			},
			{
				displayKey: "ReferralManagement",
				Title: "Referral Management",
				FuncKey: "Marketing/ReferralManagement",
				Controller: "Marketing",
				Action: "ReferralManagement",
				Icon: "",
				Roles: null,
				Childs: null
			},
			{
				displayKey: "ReferralReport",
				Title: "Referral Report",
				FuncKey: "Marketing/ReferralReport",
				Controller: "Marketing",
				Action: "ReferralReport",
				Icon: "",
				Roles: null,
				Childs: null
			},
			{
				displayKey: "NewsManage",
				Title: "News Management",
				FuncKey: "Marketing/NewsManage",
				Controller: "Marketing",
				Action: "NewsManage",
				Icon: "",
				Roles: null,
				Childs: null
			},
			{
				displayKey: "BannerManagement",
				Title: "Banner Management",
				FuncKey: "Marketing/BannerManage",
				Controller: "Marketing",
				Action: "BannerManage",
				Icon: "",
				Roles: null,
				Childs: null
			},
			{
				displayKey: "DrawPrizeReport",
				Title: "Draw Prize Report",
				FuncKey: "Marketing/DrawPrizeReport",
				Controller: "Marketing",
				Action: "DrawPrizeReport",
				Icon: "",
				Roles: null,
				Childs: null
			},
			{
				displayKey: "GameCasinoManagement",
				Title: "Game Casino Management",
				FuncKey: "Marketing/GameCasinoManagement",
				Controller: "Marketing",
				Action: "GameCasinoManagement",
				Icon: "",
				Roles: null,
				Childs: null
			}
		]
	}
];
