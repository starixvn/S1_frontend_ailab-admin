export const defMenuCategory = {
	Home: "Home",
	Reports: "Reports",
	Content: "Content",
	CSD: {
		CSD: "CSD",
		Communication: "Communication",
		KYC: "KYC",
		MemberGameSetting: "MemberGameSetting"
	},
	Finance: {
		Finance: "Finance",
		Report: "Report",
		Setting: "Setting"
	},
	Administration: "Administration",
	Marketing: {
		Marketing: "Marketing",
		Bonus: "Bonus",
		Rebate: "Rebate",
		Referral: "Referral",
		Reward: "Reward",
		Setting: "Setting"
	},
	BankFinancial: "BankFinancial",
	Game: "Game",
	KYC: "KYC",
	MemberGameSetting: ""
};

export const newFuncKey = [
	{
		displayKey: "Menu.Finance.BankAccount",
		FuncKey: "Finance/BankAccount",
		Controller: "Finance",
		Action: "BankAccount",
		Icon: "",
		Childs: null
	},

	{
		displayKey: "Menu.Marketing.AppliedBonus",
		Title: "Bonus Import",
		FuncKey: "Marketing/AppliedBonus",
		Controller: "Marketing",
		Action: "AppliedBonus",
		Icon: "",
		Childs: null
	},
	{
		displayKey: "Menu.Administration.UserActivityLog",
		Title: "User Activity Log",
		FuncKey: "Admin/UserActivityLog",
		Controller: "Admin",
		Action: "UserActivityLog",
		Icon: "",
		Childs: null
	}
];

export const deleted = [
	{
		displayKey: "Menu.Finance.BalanceAdjustmentBatch",
		FuncKey: "Finance/BalanceAdjustmentBatch",
		Controller: "Finance",
		Action: "BalanceAdjustmentBatch",
		Icon: "",
		Childs: null
	},
	{
		Key: "BonusInfoReport",
		Title: "Bonus Report",
		FuncKey: "Marketing/BonusInfoReport",
		Controller: "Marketing",
		Action: "BonusInfoReport",
		Icon: "",
		Roles: null,
		Childs: null
	},
	"CMS"
];

export const renamed = [
	{
		displayKey: "Menu.Finance.PaymentManagement",
		FuncKey: "Finance/PaymentManage",
		Controller: "Finance",
		Action: "PaymentManage",
		Icon: "",
		Childs: null
	},
	{
		displayKey: "Menu.Finance.ThirdPartyAdjustment",
		FuncKey: "Finance/ThirdPartyAdjustment",
		Controller: "Finance",
		Action: "ThirdPartyAdjustment",
		Icon: "",
		Childs: null
	},
	{
		displayKey: "Menu.Marketing.BonusManagement",
		Title: "Bonus Management",
		FuncKey: "Marketing/BonusManage",
		Controller: "Marketing",
		Action: "BonusManage",
		Icon: "",
		Childs: null
	}
];

export default [
	{
		displayKey: "Menu.Home.Home",
		Icon: "dashboard",
		Category: [defMenuCategory.Home],
		Childs: [
			{
				displayKey: "Menu.Home.Dashboard",
				FuncKey: "Home/DashboardNew",
				Controller: "Home",
				Action: "DashboardNew",
				Icon: "",
				Childs: null,
				isIndex: true
			}
		]
	},
	{
		displayKey: "Menu.CSD.CSD",
		Icon: "csd",
		Category: [defMenuCategory.CSD.CSD],
		Childs: [
			{
				displayKey: "Menu.CSD.MemberListing",
				FuncKey: "CustManage/CustInfoList",
				Controller: "Member",
				Action: "MemberList",
				Icon: "",
				Childs: null,
				NewAdmin: true
			},
			{
				displayKey: "Menu.CSD.ChangeVipLevelBatch",
				FuncKey: "Message/ChangeVipLevelBatch",
				Controller: "Message",
				Action: "ChangeVipLevelBatch",
				Icon: "",
				Childs: null
			},
			{
				displayKey: "Menu.CSD.TagManagement",
				FuncKey: "CustManage/TagManagement",
				Controller: "CustManage",
				Action: "TagManagement",
				Icon: "",
				Childs: null,
				NewAdmin: true
			},
			{
				displayKey: "Menu.CSD.RegistrationManagement",
				FuncKey: "CustManage/RegistrationManagement",
				Controller: "CustManage",
				Action: "RegistrationManagement",
				Icon: "",
				Childs: null
			},
			{
				displayKey: "Menu.CSD.TpFailRecordReport",
				FuncKey: "CustManage/TpFailRecordReport",
				Controller: "CustManage",
				Action: "TpFailRecordReport",
				Icon: "",
				Childs: null
			},
			{
				displayKey: "Menu.CSD.Communication",
				Icon: "",
				Category: [
					defMenuCategory.CSD.CSD,
					defMenuCategory.CSD.Communication
				],
				Childs: [
					{
						displayKey: "Menu.CSD.PersonalMessage",
						FuncKey: "Message/PersonalMsgBatch",
						Controller: "Message",
						Action: "PersonalMsgBatch",
						Icon: "",
						Childs: null
					},
					{
						displayKey: "Menu.CSD.TeleCSD",
						FuncKey: "CustManage/TeleCSD",
						Controller: "CustManage",
						Action: "TeleCSD",
						Icon: "",
						Childs: null
					}
				]
			},
			{
				displayKey: "Menu.CSD.KYC",
				Icon: "",
				Category: [defMenuCategory.CSD.CSD, defMenuCategory.CSD.KYC],
				Childs: [
					{
						displayKey: "Menu.CSD.WithdrawalKYCControl",
						FuncKey: "Message/WithdrawalKYCControl",
						Controller: "Member",
						Action: "WithdrawalKYCControl",
						Icon: "",
						Childs: null,
						NewAdmin: true
					}
				]
			},
			{
				displayKey: "Menu.CSD.MemberGameSetting",
				Icon: "",
				Category: [
					defMenuCategory.CSD.CSD,
					defMenuCategory.CSD.MemberGameSetting
				],
				Childs: [
					{
						displayKey: "Menu.CSD.DisableUserForGame",
						FuncKey: "CustManage/DisableUserForGame",
						Controller: "CustManage",
						Action: "DisableUserForGame",
						Icon: "",
						Childs: null
					},
					{
						displayKey: "Menu.CSD.UserBetLimit",
						FuncKey: "CustManage/UserBetLimit",
						Controller: "CustManage",
						Action: "UserBetLimit",
						Icon: "",
						Childs: null
					}
				]
			}
		]
	},
	{
		displayKey: "Menu.Content.Content",
		Icon: "edit",
		Category: [defMenuCategory.Content],
		Childs: [
			{
				displayKey: "Menu.Content.Announcement",
				FuncKey: "Message/Announcement",
				Controller: "Message",
				Action: "Announcement",
				Icon: "",
				Childs: null
			},
			{
				displayKey: "Menu.Content.NewsManage",
				Title: "News Management",
				FuncKey: "Marketing/NewsManage",
				Controller: "Marketing",
				Action: "NewsManage",
				Icon: "",
				Childs: null
			},
			{
				displayKey: "Menu.Content.BannerManagement",
				Title: "Banner Management",
				FuncKey: "CMS/BannerManage",
				Controller: "Marketing",
				Action: "BannerManage",
				Icon: "",
				Childs: null
			},
			{
				displayKey: "Menu.Content.GameCasinoManagement",
				Title: "Game Casino Management",
				FuncKey: "CMS/GameCasinoManagement",
				Controller: "Marketing",
				Action: "GameCasinoManagement",
				Icon: "",
				Childs: null
			},

			{
				displayKey: "Menu.Content.LatestHighlightVideoManagement",
				Title: "Latest Highlight Video Management",
				FuncKey: "CMS/LatestHighlightVideoManagement",
				Controller: "Marketing",
				Action: "LatestHighlightVideoManagement",
				Icon: "",
				Childs: null
			},
			{
				displayKey: "Menu.Content.DomainManagement",
				Title: "Domain Management",
				FuncKey: "CMS/DomainManage",
				Controller: "Marketing",
				Action: "DomainManage",
				Icon: "",
				Childs: null
			},
			{
				displayKey: "Menu.Content.VendersMaintenance",
				Title: "Venders Maintenance",
				FuncKey: "CMS/TpMaintain",
				Controller: "Marketing",
				Action: "TpMaintain",
				Icon: "",
				Childs: null
			},
			{
				displayKey: "Menu.Content.LeaderBoardExtraPoint",
				Title: "LeaderBoard ExtraPoint",
				FuncKey: "CMS/LeaderBoardExtraPoint",
				Controller: "Marketing",
				Action: "LeaderBoardExtraPoint",
				Icon: "",
				Childs: null
			},
			{
				displayKey: "Menu.Content.AppLinkManagement",
				Title: "App Link Management",
				FuncKey: "CMS/AppLinkManagement",
				Controller: "Marketing",
				Action: "AppLinkManagement",
				Icon: "",
				Childs: null
			},
			{
				displayKey: "Menu.CSD.TpFailRecordReport",
				FuncKey: "CustManage/TpFailRecordReport",
				Controller: "CustManage",
				Action: "TpFailRecordReport",
				Icon: "",
				Childs: null
			},
			{
				displayKey: "Menu.CSD.Communication",
				Icon: "",
				Category: [
					defMenuCategory.CSD.CSD,
					defMenuCategory.CSD.Communication
				],
				Childs: [
					{
						displayKey: "Menu.CSD.PersonalMessage",
						FuncKey: "Message/PersonalMsgBatch",
						Controller: "Message",
						Action: "PersonalMsgBatch",
						Icon: "",
						Childs: null
					},
					{
						displayKey: "Menu.CSD.TeleCSD",
						FuncKey: "CustManage/TeleCSD",
						Controller: "CustManage",
						Action: "TeleCSD",
						Icon: "",
						Childs: null
					}
				]
			},
			{
				displayKey: "Menu.CSD.KYC",
				Icon: "",
				Category: [defMenuCategory.CSD.CSD, defMenuCategory.CSD.KYC],
				Childs: [
					{
						displayKey: "Menu.CSD.WithdrawalKYCControl",
						FuncKey: "Message/WithdrawalKYCControl",
						Controller: "Message",
						Action: "WithdrawalKYCControl",
						Icon: "",
						Childs: null
					}
				]
			},
			{
				displayKey: "Menu.CSD.MemberGameSetting",
				Icon: "",
				Category: [
					defMenuCategory.CSD.CSD,
					defMenuCategory.CSD.MemberGameSetting
				],
				Childs: [
					{
						displayKey: "Menu.CSD.DisableUserForGame",
						FuncKey: "CustManage/DisableUserForGame",
						Controller: "CustManage",
						Action: "DisableUserForGame",
						Icon: "",
						Childs: null
					},
					{
						displayKey: "Menu.CSD.UserBetLimit",
						FuncKey: "CustManage/UserBetLimit",
						Controller: "CustManage",
						Action: "UserBetLimit",
						Icon: "",
						Childs: null
					}
				]
			}
		]
	},
	{
		displayKey: "Menu.Finance.Finance",
		Icon: "finance",
		Category: [defMenuCategory.Finance.Finance],
		Childs: [
			{
				displayKey: "Menu.Finance.DepositRequest",
				FuncKey: "Finance/DepositList",
				Controller: "Finance",
				Action: "DepositList",
				Icon: "",
				Childs: null,
				NewAdmin: true
			},
			{
				displayKey: "Menu.Finance.WithdrawalListing",
				FuncKey: "Finance/WithdrawalList",
				Controller: "Finance",
				Action: "WithdrawalList",
				Icon: "",
				Childs: null,
				NewAdmin: true
			},
			{
				displayKey: "Menu.Finance.WithdrawalAccountingList",
				FuncKey: "Finance/WithdrawalAccountingList",
				Controller: "Finance",
				Action: "WithdrawalAccountingList",
				Icon: "",
				Childs: null
			},

			{
				displayKey: "Menu.Finance.BalanceAdjustment",
				FuncKey: "Finance/PaymentAdjustment",
				Controller: "Finance",
				Action: "PaymentAdjustment",
				Icon: "",
				Childs: null
			},
			{
				displayKey: "Menu.Content.DomainManagement",
				Title: "Domain Management",
				FuncKey: "CMS/DomainManage",
				Controller: "Marketing",
				Action: "DomainManage",
				Icon: "",
				Childs: null
			},
			{
				displayKey: "Menu.Content.VendersMaintenance",
				Title: "Venders Maintenance",
				FuncKey: "CMS/TpMaintain",
				Controller: "Marketing",
				Action: "TpMaintain",
				Icon: "",
				Childs: null
			},
			{
				displayKey: "Menu.Finance.ThirdPartyAdjustment",
				FuncKey: "Finance/ThirdPartyAdjustment",
				Controller: "Finance",
				Action: "ThirdPartyAdjustment",
				Icon: "",
				Childs: null
			},
			{
				displayKey: "Menu.Finance.Report",
				Icon: "",
				Category: [
					defMenuCategory.Finance.Finance,
					defMenuCategory.Finance.Report
				],
				Childs: [
					{
						displayKey: "Menu.Finance.DepositTimeReport",
						FuncKey: "Finance/DepositTimeReport",
						Controller: "Finance",
						Action: "DepositTimeReport",
						Icon: "",
						Childs: null
					},
					{
						displayKey: "Menu.Finance.WithdrawalTimeReport",
						FuncKey: "Finance/WithdrawalTimeReport",
						Controller: "Finance",
						Action: "WithdrawalTimeReport",
						Icon: "",
						Childs: null
					},
					{
						displayKey: "Menu.Finance.AdjustmentReport",
						FuncKey: "Finance/AdjustmentReport",
						Controller: "Finance",
						Action: "PaymentAdjustmentReport",
						Icon: "",
						Childs: null
					}
				]
			},
			{
				displayKey: "Menu.Finance.Setting",
				Icon: "",
				Category: [
					defMenuCategory.Finance.Finance,
					defMenuCategory.Finance.Setting
				],
				Childs: [
					{
						displayKey: "Menu.Finance.BankCardManagement",
						FuncKey: "Finance/BankInfoList",
						Controller: "Finance",
						Action: "BankInfoList",
						Icon: "",
						Childs: null
					},
					{
						displayKey: "Menu.Finance.PaymentManagement",
						FuncKey: "Finance/PaymentManage",
						Controller: "Finance",
						Action: "PaymentManage",
						Icon: "",
						Childs: null
					},
					{
						displayKey: "Menu.Finance.DepositLimitManagement",
						FuncKey: "Finance/DepositLimitManage",
						Controller: "Finance",
						Action: "DepositLimitManagement",
						Icon: "",
						Childs: null
					},
					{
						displayKey: "Menu.Finance.WithdrawalLimitManagement",
						FuncKey: "Finance/WithdrawalLimitManagement",
						Controller: "Finance",
						Action: "WithdrawalLimitManagement",
						Icon: "",
						Childs: null
					},
					{
						displayKey:
							"Menu.Finance.USDTWithdrawalLimitManagement",
						FuncKey: "Finance/USDTWithdrawalLimitManagement",
						Controller: "Finance",
						Action: "USDTWithdrawalLimitManagement",
						Icon: "",
						Childs: null
					},
					{
						displayKey: "Menu.Finance.AdjustmentLimitManagement",
						FuncKey: "Finance/AdjustmentLimitManagement",
						Controller: "Finance",
						Action: "AdjustmentLimitManagement",
						Icon: "",
						Childs: null
					}
				]
			}
		]
	},
	{
		displayKey: "Menu.Marketing.Marketing",
		Title: "Marketing",
		Icon: "marketing",
		Category: [defMenuCategory.Marketing.Marketing],
		Childs: [
			{
				displayKey: "Menu.Marketing.Bonus",
				Icon: "",
				Category: [
					defMenuCategory.Marketing.Marketing,
					defMenuCategory.Marketing.Bonus
				],
				Childs: [
					{
						displayKey: "Menu.Marketing.BonusManagement",
						Title: "Bonus Management",
						FuncKey: "Marketing/BonusManage",
						Controller: "Marketing",
						Action: "BonusManage",
						Icon: "",
						Childs: null
					},
					{
						displayKey: "Menu.Marketing.AppliedBonus",
						FuncKey: "Marketing/BonusInfoReport",
						Controller: "Marketing",
						Action: "BonusInfoReport",
						Icon: "",
						Childs: null
					},
					{
						displayKey: "Menu.Marketing.PendingBonus",
						Title: "Pending Bonus",
						FuncKey: "Marketing/PendingBonus",
						Controller: "Marketing",
						Action: "PendingBonus",
						Icon: "",
						Childs: null
					}
				]
			},
			{
				displayKey: "Menu.Marketing.Rebate",
				Icon: "",
				Category: [
					defMenuCategory.Marketing.Marketing,
					defMenuCategory.Marketing.Rebate
				],
				Childs: [
					{
						displayKey: "Menu.Marketing.RebateInfoReport",
						Title: "Rebate Info",
						FuncKey: "Marketing/RebateInfoReport",
						Controller: "Marketing",
						Action: "RebateInfoReport",
						Icon: "",
						Childs: null
					},
					{
						displayKey: "Menu.Marketing.RebateLogReport",
						Title: "Rebate Report",
						FuncKey: "Marketing/RebateLogReport",
						Controller: "Marketing",
						Action: "RebateLogReport",
						Icon: "",
						Childs: null
					},
					{
						displayKey: "Menu.Marketing.VipRebateInfoReport",
						Title: "Vip Rebate Report",
						FuncKey: "Marketing/VipRebateInfoReport",
						Controller: "Marketing",
						Action: "VipRebateInfoReport",
						Icon: "",
						Childs: null
					},
					{
						displayKey: "Menu.Marketing.VipRebateManagement",
						Title: "Vip Rebate Management",
						FuncKey: "Marketing/VipRebateMangetment",
						Controller: "Marketing",
						Action: "VipRebateMangetment",
						Icon: "",
						Childs: null
					}
				]
			},
			{
				displayKey: "Menu.Marketing.Referral",
				Icon: "",
				Category: [
					defMenuCategory.Marketing.Marketing,
					defMenuCategory.Marketing.Referral
				],
				Childs: [
					{
						displayKey: "Menu.Marketing.ReferralManagement",
						Title: "Referral Management",
						FuncKey: "Marketing/ReferralManagement",
						Controller: "Marketing",
						Action: "ReferralManagement",
						Icon: "",
						Childs: null
					},
					{
						displayKey: "Menu.Marketing.ReferralReport",
						Title: "Referral Report",
						FuncKey: "Marketing/ReferralReport",
						Controller: "Marketing",
						Action: "ReferralReport",
						Icon: "",
						Childs: null
					}
				]
			},
			{
				displayKey: "Menu.Marketing.Reward",
				Icon: "",
				Category: [
					defMenuCategory.Marketing.Marketing,
					defMenuCategory.Marketing.Reward
				],
				Childs: [
					{
						displayKey: "Menu.Marketing.VerificationReward",
						Title: "Verification Reward",
						FuncKey: "Marketing/VerificationReward",
						Controller: "Marketing",
						Action: "VerificationReward",
						Icon: "",
						Childs: null
					},
					{
						displayKey: "Menu.Marketing.VerificationRewardReport",
						Title: "Verification Reward Report",
						FuncKey: "Marketing/VerificationRewardReport",
						Controller: "Marketing",
						Action: "VerificationRewardReport",
						Icon: "",
						Childs: null
					}
				]
			},
			{
				displayKey: "Menu.Marketing.DrawPrizeReport",
				Title: "Draw Prize Report",
				FuncKey: "Marketing/DrawPrizeReport",
				Controller: "Marketing",
				Action: "DrawPrizeReport",
				Icon: "",
				Childs: null
			},
			{
				displayKey: "Menu.Marketing.Setting",
				Icon: "",
				Category: [
					defMenuCategory.Marketing.Marketing,
					defMenuCategory.Marketing.Setting
				],
				Childs: [
					{
						displayKey: "Menu.Marketing.PointLevelManagement",
						Title: "Point Level Management",
						FuncKey: "Marketing/PointLevelManagement",
						Controller: "Marketing",
						Action: "PointLevelManagement",
						Icon: "",
						Childs: null
					}
				]
			},

			{
				displayKey: "Menu.Marketing.VipLevelReview",
				Title: "Vip Level Review",
				FuncKey: "Marketing/VipLevelReview",
				Controller: "Marketing",
				Action: "VipLevelReview",
				Icon: "",
				Childs: null
			}
		]
	},
	{
		displayKey: "Menu.Game.Game",
		Title: "Game",
		Icon: "admin",
		Category: [defMenuCategory.Game],
		Childs: [
			{
				displayKey: "Menu.Game.FailBet",
				Title: "Fail Bet",
				FuncKey: "Admin/TpFailRecordReport",
				Controller: "Admin",
				Action: "FailBet",
				Icon: "",
				Childs: null
			},
			{
				displayKey: "Menu.Finance.Report",
				Icon: "",
				Category: [
					defMenuCategory.Finance.Finance,
					defMenuCategory.Finance.Report
				],
				Childs: [
					{
						displayKey: "Menu.Finance.DepositTimeReport",
						FuncKey: "Finance/DepositTimeReport",
						Controller: "Finance",
						Action: "DepositTimeReport",
						Icon: "",
						Childs: null
					},
					{
						displayKey: "Menu.Finance.WithdrawalTimeReport",
						FuncKey: "Finance/WithdrawalTimeReport",
						Controller: "Finance",
						Action: "WithdrawalTimeReport",
						Icon: "",
						Childs: null
					},
					{
						displayKey: "Menu.Finance.AdjustmentReport",
						FuncKey: "Finance/AdjustmentReport",
						Controller: "Finance",
						Action: "PaymentAdjustmentReport",
						Icon: "",
						Childs: null
					}
				]
			},
			{
				displayKey: "Menu.Finance.Setting",
				Icon: "",
				Category: [
					defMenuCategory.Finance.Finance,
					defMenuCategory.Finance.Setting
				],
				Childs: [
					{
						displayKey: "Menu.Finance.BankCardManagement",
						FuncKey: "Finance/BankInfoList",
						Controller: "Finance",
						Action: "BankInfoList",
						Icon: "",
						Childs: null
					},
					{
						displayKey: "Menu.Finance.PaymentManagement",
						FuncKey: "Finance/PaymentManage",
						Controller: "Finance",
						Action: "PaymentManage",
						Icon: "",
						Childs: null
					},
					{
						displayKey: "Menu.Finance.DepositLimitManagement",
						FuncKey: "Finance/DepositLimitManage",
						Controller: "Finance",
						Action: "DepositLimitManagement",
						Icon: "",
						Childs: null
					},
					{
						displayKey: "Menu.Finance.WithdrawalLimitManagement",
						FuncKey: "Finance/WithdrawalLimitManagement",
						Controller: "Finance",
						Action: "WithdrawalLimitManagement",
						Icon: "",
						Childs: null
					},
					{
						displayKey:
							"Menu.Finance.USDTWithdrawalLimitManagement",
						FuncKey: "Finance/USDTWithdrawalLimitManagement",
						Controller: "Finance",
						Action: "USDTWithdrawalLimitManagement",
						Icon: "",
						Childs: null
					},
					{
						displayKey: "Menu.Finance.AdjustmentLimitManagement",
						FuncKey: "Finance/AdjustmentLimitManagement",
						Controller: "Finance",
						Action: "AdjustmentLimitManagement",
						Icon: "",
						Childs: null
					}
				]
			}
		]
	},
	{
		displayKey: "Menu.BankFinancial.BankFinancial",
		Title: "BankFinancial",
		Icon: "transfer",
		Category: [defMenuCategory.BankFinancial],
		Childs: [
			{
				displayKey: "Menu.BankFinancial.TransferAccountManage",
				Title: "Bank Transfer Account",
				FuncKey: "BankFinancial/TransferAccountManage",
				Controller: "BankFinancial",
				Action: "TransferAccountManage",
				Icon: "",
				Childs: null
			},
			{
				displayKey: "Menu.BankFinancial.TransferManage",
				Title: "Transfer Management",
				FuncKey: "BankFinancial/TransferManage",
				Controller: "BankFinancial",
				Action: "TransferManage",
				Icon: "",
				Category: [
					defMenuCategory.Marketing.Marketing,
					defMenuCategory.Marketing.Setting
				],
				Childs: [
					{
						displayKey: "Menu.Marketing.PointLevelManagement",
						Title: "Point Level Management",
						FuncKey: "Marketing/PointLevelManagement",
						Controller: "Marketing",
						Action: "PointLevelManagement",
						Icon: "",
						Childs: null
					}
				]
			},

			{
				displayKey: "Menu.BankFinancial.TransferInfoReport",
				Title: "Transfer Report",
				FuncKey: "BankFinancial/TransferInfoReport",
				Controller: "BankFinancial",
				Action: "TransferInfoReport",
				Icon: "",
				Childs: null
			},
			{
				displayKey: "Menu.BankFinancial.ReasonManagement",
				Title: "Reason Management",
				FuncKey: "BankFinancial/ReasonManagement",
				Controller: "BankFinancial",
				Action: "ReasonManagement",
				Icon: "",
				Childs: null
			}
		]
	},
	// {
	// 	displayKey: "Menu.Game.Game",
	// 	Title: "Game",
	// 	Icon: "admin",
	// 	Category: [defMenuCategory.Game],
	// 	Childs: [
	// 		{
	// 			displayKey: "Menu.BankFinancial.BankFinancialReport",
	// 			Title: "BankFinancial Report",
	// 			FuncKey: "BankFinancial/BankFinancialReport",
	// 			Controller: "BankFinancial",
	// 			Action: "BankFinancialReport",
	// 			Icon: "",
	// 			Childs: null
	// 		}
	// 	]
	// },
	{
		displayKey: "Menu.Reports.Reports",
		Icon: "report",
		Category: [defMenuCategory.Reports],
		Childs: [
			{
				displayKey: "Menu.Reports.WinLostReport",
				FuncKey: "LicWinLost/Report",
				Controller: "Report",
				Action: "LicWinLost",
				Icon: "",
				Childs: null
			},
			{
				displayKey: "Menu.Reports.MainFinancialReport",
				FuncKey: "Report/MainFinancialReport",
				Controller: "Report",
				Action: "MainFinancialReport",
				Icon: "",
				Childs: null
			},
			{
				displayKey: "Menu.Reports.DepositReport",
				FuncKey: "Report/DepositReport",
				Controller: "Report",
				Action: "DepositReport",
				Icon: "",
				Childs: null
			},
			{
				displayKey: "Menu.Reports.StatisticalReport",
				FuncKey: "Report/StatisticalReport",
				Controller: "Report",
				Action: "StatisticalReport",
				Icon: "",
				Childs: null
			},
			{
				displayKey: "Menu.Reports.CustomerStatisticalReport",
				FuncKey: "Report/CustomerStatisticalReport",
				Controller: "Report",
				Action: "CustomerStatisticalReport",
				Icon: "",
				Childs: null
			},
			{
				displayKey: "Menu.Reports.UserOnlineReport",
				FuncKey: "Report/UserOnlineReport",
				Controller: "Report",
				Action: "UserOnlineReport",
				Icon: "",
				Childs: null
			}
		]
	},
	{
		displayKey: "Menu.Administration.Administration",
		Title: "Administration",
		Icon: "admin",
		Category: [defMenuCategory.Administration],
		Childs: [
			{
				displayKey: "Menu.Administration.GroupSetting",
				Title: "Group Setting",
				FuncKey: "Admin/GroupAuthoritySetting",
				Controller: "Admin",
				Action: "GroupAuthoritySetting",
				Icon: "",
				Childs: null
			},
			{
				displayKey: "Menu.Administration.UserSetting",
				Title: "User Setting",
				FuncKey: "Admin/UserAuthoritySetting",
				Controller: "Admin",
				Action: "UserAuthoritySetting",
				Icon: "",
				Childs: null
			},
			{
				displayKey: "Menu.Administration.SpecialPasswordManagement",
				Title: "Special Password Management",
				FuncKey: "Admin/SpecialPasswordManagement",
				Controller: "Admin",
				Action: "SpecialPasswordManagement",
				Icon: "",
				Childs: null
			},
			{
				displayKey: "Menu.Administration.AdjustmentLogReport",
				FuncKey: "Admin/AdjustmentLogReport",
				Controller: "Admin",
				Action: "AdjustmentLogReport",
				Icon: "",
				Childs: null
			}
		]
	}
];
