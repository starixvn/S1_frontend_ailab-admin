import React, { useEffect, useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import { useAlert } from "react-alert";
import { popBoxContext } from "../../components/context";
import Layout from "../../components/layout";
import { NavBar } from "../../components/memberDetail/nav";
import {
	api_customerManage_GetCustInfoDetail,
	api_customerManage_ResetProfile,
	api_customerManage_ResetPwd,
	api_customerManage_KickOut,
	api_customerManage_SetEnablePromotionStatus,
	api_customerManage_ResetCustBankInfo,
	api_customerManage_ResetCustUSDTInfo,
	api_customerManage_SetCustStatusSwitch
} from "../../service/api/customerManage";
import { useGetCurrencyData } from "../../hook";
import Dropdown from "../../components/dropdown";
import { number_format, datetime_format } from "../../components/common";
import Tags from "../../components/tags";
import {
	useHandleTags,
	useHandleStatus,
	defStats,
	useHandleVIPLevel,
	useHandleMemberLevel
} from "../../components/memberDetail/hook";
import { ButtonWithLoading } from "../../components/buttonWithLoading";
import { defPopBoxType } from "../../components/popBox";

export default function Page(props) {
	const { t } = useTranslation();
	const alert = useAlert();
	const [custInfo, setCustInfo] = useState();
	const { confirm, setPopBox } = useContext(popBoxContext);

	const custId = props?.match?.params?.id;

	const getCustInfoDetail = async _custId => {
		try {
			const res = await api_customerManage_GetCustInfoDetail({
				custId: _custId
			});

			const { errorCode, message, data } = res.data;
			if (errorCode === 0) {
				setCustInfo({
					...data
				});
			} else {
				alert.error(`[${errorCode}] ${message || "error"}`);
			}
		} catch (error) {}
	};

	const SetCustStatus = ({ field, option, status, onUpdate }) => {
		confirm({
			title: "Are you sure ?",
			content: `${status ? "Verify" : "Unverify"} ${field}`,
			async onOk() {
				try {
					const res = await api_customerManage_SetCustStatusSwitch({
						custId: custInfo.custId,
						option,
						status
					});

					const { errorCode, message } = res.data;
					if (errorCode === 0) {
						onUpdate();
					} else {
						alert.error(`[${errorCode}] ${message || "error"}`);
					}
				} catch (error) {
					console.log(error);
				}
			}
		});
		api_customerManage_SetCustStatusSwitch;
	};

	useEffect(() => {
		if (custId) {
			getCustInfoDetail(custId);
		}
	}, [custId]);

	return (
		<Layout>
			<main className="col-md-9 col-lg-10 customerInformation">
				<h1 className="h2">{t("Member.MemberDetail.Title")}</h1>
				<NavBar />
				<div className="row">
					<div className="col-xl-4">
						{custInfo && (
							<Main
								custInfo={custInfo}
								t={t}
								getCustInfoDetail={() =>
									getCustInfoDetail(custId)
								}
								popBox={{
									confirm,
									setPopBox
								}}
								SetCustStatus={SetCustStatus}
							/>
						)}
						{custInfo && (
							<SiginUpInfo
								custInfo={custInfo}
								t={t}
								SetCustStatus={SetCustStatus}
							/>
						)}
					</div>
					<div className="col-xl-8">
						{custInfo && (
							<FinanceInfo
								custInfo={custInfo}
								t={t}
								popBox={{
									confirm,
									setPopBox
								}}
							/>
						)}
						{custInfo && (
							<GameAndWalletInfo
								custInfo={custInfo}
								t={t}
								alert={alert}
							/>
						)}
					</div>
				</div>
			</main>
		</Layout>
	);
}

const ElgibleWithdrawal = (custInfo = null) => {
	if (!custInfo) return 0;

	const { withdrawalLimit, turnOver, tpWallet, balance } = custInfo;

	let res = balance - withdrawalLimit - turnOver;

	tpWallet?.forEach(tp => {
		res += tp.balance;
	});

	return res < 0 ? 0 : res;
};

const Main = ({ custInfo, t, getCustInfoDetail, popBox, SetCustStatus }) => {
	const { confirm, setPopBox } = popBox;
	const alert = useAlert();

	const {
		status,
		status_Options,
		handleStatus: status_OnSelect
	} = useHandleStatus({
		custInfo
	});

	const {
		options: VIPLevel_Options,
		value: VIPLevel,
		onSelect: VIPLevel_OnSelect
	} = useHandleVIPLevel({ custInfo });

	const {
		options: MemberLevel_Options,
		value: MemberLevel,
		onSelect: MemberLevel_OnSelect
	} = useHandleMemberLevel({ custInfo });

	const { currencyData } = useGetCurrencyData({
		currencyIds: custInfo.currencyId
	});

	const [isKyc, setIsKyc] = useState(custInfo.isKyc);
	const [isRisk, setIsRisk] = useState(custInfo.isRisk);

	const {
		tag_Options,
		tag_Selected,
		handleSelectTags,
		showSubmitBtn,
		onSubmitTag,
		loading
	} = useHandleTags({
		custId: custInfo.custId
	});

	const onResetProfile = () => {
		confirm({
			title: "Are you sure ?",
			content: "Reset Profile",
			async onOk() {
				try {
					const res = await api_customerManage_ResetProfile({
						custId: custInfo.custId
					});

					const { errorCode, message } = res.data;
					if (errorCode === 0) {
						getCustInfoDetail();
					} else {
						alert.error(`[${errorCode}] ${message || "error"}`);
					}
				} catch (error) {
					console.log(error);
				}
			}
		});
	};

	const onResetPassword = () => {
		confirm({
			title: "Are you sure ?",
			content: "Reset Password",
			async onOk() {
				try {
					const res = await api_customerManage_ResetPwd({
						custId: custInfo.custId
					});

					const { errorCode, message } = res.data;
					if (errorCode !== 0) {
						alert.error(`[${errorCode}] ${message || "error"}`);
					}
				} catch (error) {
					console.log(error);
				}
			}
		});
	};

	const onKickout = () => {
		const onUpdate = async reason => {
			try {
				const res = await api_customerManage_KickOut({
					custId: custInfo.custId,
					reason
				});

				const { errorCode, message } = res.data;
				if (errorCode !== 0) {
					alert.error(`[${errorCode}] ${message || "error"}`);
				}
			} catch (error) {
				console.log(error);
			} finally {
				setPopBox({ isOpen: false });
			}
		};

		setPopBox({
			isOpen: true,
			popBoxType: defPopBoxType.memberDetailReasonModal,
			title: "Reason Of Kick Out User",
			onUpdate: reason =>
				confirm({
					title: "Are you sure ?",
					content: "Kick Out",
					onOk() {
						onUpdate(reason);
					}
				})
		});
	};

	const onHandlePromotionStatus = () => {
		confirm({
			title: "Are you sure ?",
			content: `${
				custInfo.enablePromotion ? "Disable" : "Enable"
			} Promotion`,
			async onOk() {
				try {
					const res = await api_customerManage_SetEnablePromotionStatus(
						{
							custId: custInfo.custId,
							status: custInfo.enablePromotion ? 0 : 1
						}
					);

					const { errorCode, message } = res.data;
					if (errorCode === 0) {
						getCustInfoDetail();
					} else {
						alert.error(`[${errorCode}] ${message || "error"}`);
					}
				} catch (error) {
					console.log(error);
				}
			}
		});
	};

	const onEditProfile = () => {
		setPopBox({
			isOpen: true,
			popBoxType: defPopBoxType.memberDetailEditProfileModal,
			title: "Edit Profile",
			onUpdate: getCustInfoDetail,
			custInfo
		});
	};

	return (
		<div className="card">
			<div className="card-body row">
				<div className="col-xl-4 text-center">
					<div className="avatar icon icon-admin" />
					<h6>{custInfo.userName}</h6>
					<p className="small">{currencyData?.displayText}</p>
					<div className="btn-group">
						{status?.value === defStats.Closed ? (
							t(`Status.${defStats.Closed}`)
						) : (
							<Dropdown
								value={status}
								options={status_Options}
								onSelect={status_OnSelect}
							/>
						)}
					</div>
				</div>
				<div className="col-xl-8">
					<div className="row">
						<div className="col-6">
							<Dropdown
								title="VIP Level"
								value={VIPLevel}
								options={VIPLevel_Options}
								onSelect={VIPLevel_OnSelect}
							/>
							<h6>Test Account</h6>
							<p className="small">
								{custInfo.isTest ? "Yes" : "No"}
							</p>
							<h6>KYC</h6>
							<div className="form-switch">
								<input
									className="form-check-input"
									type="checkbox"
									checked={isKyc}
									onChange={() => {
										SetCustStatus({
											field: "KYC",
											option: 1,
											status: custInfo.isKyc ? 0 : 1,
											onUpdate: () =>
												setIsKyc(prev => !prev)
										});
									}}
								/>
							</div>
						</div>
						<div className="col-6">
							<Dropdown
								title="Member Level"
								value={MemberLevel}
								options={MemberLevel_Options}
								onSelect={MemberLevel_OnSelect}
							/>
							<h6>IOvation</h6>
							<p className="small">
								{custInfo.iovation
									? t(`Iovation.${custInfo.iovation}`)
									: "N/A"}
							</p>
							<h6>Risk</h6>
							<div className="form-switch">
								<input
									className="form-check-input"
									type="checkbox"
									checked={isRisk}
									onChange={() => {
										SetCustStatus({
											field: "Risk",
											option: 2,
											status: custInfo.isRisk ? 0 : 1,
											onUpdate: () =>
												setIsRisk(prev => !prev)
										});
									}}
								/>
							</div>
						</div>
					</div>
					{tag_Options?.length >= 1 && (
						<Tags
							options={tag_Options}
							onSelect={handleSelectTags}
							selected={tag_Selected}
							showSubmitBtn={showSubmitBtn()}
							onSubmit={onSubmitTag}
							loading={loading}
						/>
					)}
				</div>
			</div>
			<div className="card-footer">
				<ButtonWithLoading
					onClick={onEditProfile}
					tooltip="Edit Profile"
					className="btn icon icon-edit"
					variant=""
				/>

				<ButtonWithLoading
					onClick={onResetProfile}
					tooltip="Reset Profile"
					className="btn icon icon-reset"
					variant=""
				/>

				<ButtonWithLoading
					onClick={onResetPassword}
					tooltip="Reset Password"
					className="btn icon icon-password"
					variant=""
				/>

				<ButtonWithLoading
					onClick={onKickout}
					tooltip="Kick out"
					className="btn icon icon-out"
					variant=""
				/>

				<ButtonWithLoading
					onClick={onHandlePromotionStatus}
					tooltip={`${
						custInfo.enablePromotion ? "Disable" : "Enable"
					} Promotion`}
					className="btn icon icon-basket"
					variant=""
				/>
			</div>
		</div>
	);
};

const SiginUpInfo = ({ custInfo, SetCustStatus }) => {
	const [emailVerified, setEmailVerified] = useState(custInfo.emailVerified);
	const [phoneVerified, setPhoneVerified] = useState(custInfo.phoneVerified);
	return (
		<div className="card">
			<div className="card-body">
				<h6 className="card-title">Sign Up Information</h6>
				<div className="row">
					<div className="col-5">Full Name</div>
					<div className="col-7 small">{custInfo.accountName}</div>
				</div>
				<div className="row">
					<div className="col-5">Date of Birth</div>
					<div className="col-7 small">
						{`${custInfo.birth_d}/${custInfo.birth_m}/${custInfo.birth_y}`}
					</div>
				</div>
				<div className="row">
					<div className="col-5">Country</div>
					<div className="col-7 small">{custInfo.countryCode}</div>
				</div>
				<div className="row">
					<div className="col-5">Contact No.</div>
					<div className="col-7 small">
						<div className="form-switch">
							<input
								className="form-check-input"
								type="checkbox"
								checked={phoneVerified}
								onChange={() => {
									SetCustStatus({
										field: "Phone",
										option: 3,
										status: custInfo.phoneVerified ? 0 : 1,
										onUpdate: () =>
											setPhoneVerified(prev => !prev)
									});
								}}
							/>
						</div>
						{`(${custInfo.areaCode}) ${custInfo.phoneNo}`}
					</div>
				</div>
				<div className="row">
					<div className="col-5">Email</div>
					<div className="col-7 small">
						<div className="form-switch">
							<input
								className="form-check-input"
								type="checkbox"
								checked={emailVerified}
								onChange={() => {
									SetCustStatus({
										field: "Email",
										option: 4,
										status: custInfo.emailVerified ? 0 : 1,
										onUpdate: () =>
											setEmailVerified(prev => !prev)
									});
								}}
							/>
						</div>
						{custInfo.email}
					</div>
				</div>
				<div className="row">
					<div className="col-5">Register Date</div>
					<div className="col-7 small">
						{datetime_format(custInfo.regTime)}
					</div>
				</div>
				<div className="row">
					<div className="col-5">Agent Name</div>
					<div className="col-7 small">{custInfo.agent}</div>
				</div>
				<div className="row">
					<div className="col-5">Affiliate Id</div>
					<div className="col-7 small">
						{custInfo.affiliateId ?? "N/A"}
					</div>
				</div>
				<div className="row">
					<div className="col-5">Affiliate Code</div>
					<div className="col-7 small">
						{custInfo.affiliateCode ?? "N/A"}
					</div>
				</div>
				<div className="row">
					<div className="col-5">sabaID</div>
					<div className="col-7 small">
						{custInfo.sabaID ?? "N/A"}
					</div>
				</div>
				<div className="row">
					<div className="col-5">Last Login Date</div>
					<div className="col-7 small">
						{datetime_format(custInfo.lastLoginTime)}
					</div>
				</div>
				<div className="row">
					<div className="col-5">Last Activity Time</div>
					<div className="col-7 small">
						{datetime_format(custInfo.reloadTime)}
					</div>
				</div>
				<div className="row">
					<div className="col-5">IP</div>
					<div className="col-7 small">{custInfo.ip ?? "N/A"}</div>
				</div>
			</div>
		</div>
	);
};

const FinanceInfo = ({ custInfo, t, popBox }) => {
	const alert = useAlert();
	const { confirm } = popBox;

	const onResetBankInfo = () => {
		confirm({
			title: "Are you sure ?",
			content: "Reset Bank Info",
			async onOk() {
				try {
					const res = await api_customerManage_ResetCustBankInfo({
						custId: custInfo.custId
					});

					const { errorCode, message } = res.data;
					if (errorCode === 0) {
						getCustInfoDetail();
					} else {
						alert.error(`[${errorCode}] ${message || "error"}`);
					}
				} catch (error) {
					console.log(error);
				}
			}
		});
	};

	const onResetUSDTInfo = () => {
		confirm({
			title: "Are you sure ?",
			content: "Reset USDT Info",
			async onOk() {
				try {
					const res = await api_customerManage_ResetCustUSDTInfo({
						custId: custInfo.custId
					});

					const { errorCode, message } = res.data;
					if (errorCode === 0) {
						getCustInfoDetail();
					} else {
						alert.error(`[${errorCode}] ${message || "error"}`);
					}
				} catch (error) {
					console.log(error);
				}
			}
		});
	};

	return (
		<div className="card financeInformation">
			<div className="card-body">
				<h6 className="card-title">Finance Information</h6>
				<div className="row">
					<div className="col-xxl-4">
						<div className="card">
							<div className="card-body">
								<div className="small">Total Deposit</div>
								<div>{number_format(custInfo.depositSum)}</div>
							</div>
							<div className="enIcon">D</div>
						</div>
					</div>
					<div className="col-xxl-4">
						<div className="card">
							<div className="card-body">
								<div className="small">Total Withdrawal</div>
								<div>
									{number_format(custInfo.withdrawlSum)}
								</div>
							</div>
							<div className="enIcon">W</div>
						</div>
					</div>
					<div className="col-xxl-4">
						<div className="card">
							<div className="card-body">
								<div className="small">Total Bonus Claimed</div>
								<div>
									{number_format(custInfo.totalBonusClaimed)}
								</div>
							</div>
							<div className="enIcon">B</div>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-md-4">
						<div>Account Status</div>
						<div className="small bg-success">
							{t(`ActStatus.${custInfo.actStatus}`)}
						</div>
					</div>
					<div className="col-md-4">
						<div>Withdrawal Limit</div>
						<div className="small">
							{number_format(custInfo.withdrawalLimit)}
						</div>
					</div>
					<div className="col-md-4">
						<div>Last Deposit Date</div>
						<div className="small">
							{datetime_format(custInfo.lastDepositTime)}
						</div>
					</div>
					<div className="col-md-4">
						<div>Point Level</div>
						<div className="small">{custInfo.pointLevel}</div>
					</div>
					<div className="col-md-4">
						<div>Total Adjustment</div>
						<div className="small">
							{number_format(custInfo.totalAdjustment)}
						</div>
					</div>
					<div className="col-md-4">
						<div>Last Withdrawal Date</div>
						<div className="small">
							{datetime_format(custInfo.lastWithdrawlTime)}
						</div>
					</div>
					<div className="col-md-4">
						<div>Eligible Withdrawal</div>
						<div className="small">
							{number_format(ElgibleWithdrawal(custInfo))}
						</div>
					</div>
					<div className="col-md-4">
						<div>First Deposit Date</div>
						<div className="small">
							{datetime_format(custInfo.firstDepositTime)}
						</div>
					</div>
				</div>
			</div>
			<div className="card-footer">
				<ButtonWithLoading
					onClick={onResetBankInfo}
					tooltip="Reset Bank Info"
					className="btn icon icon-finance"
					variant=""
				/>

				<ButtonWithLoading
					onClick={onResetUSDTInfo}
					tooltip="Reset USDT Info"
					className="btn icon icon-eth"
					variant=""
				/>
			</div>
		</div>
	);
};

const GameAndWalletInfo = ({ custInfo, t, alert }) => {
	let totalBalance = 0;

	const copyText = value => {
		const virtualInput = document.createElement("input");
		virtualInput.value = value;
		document.body.appendChild(virtualInput);
		virtualInput.select();
		document.execCommand("copy");
		document.body.removeChild(virtualInput);

		alert.success(`copied: ${value}`);
	};

	const tpWalletRows = custInfo.tpWallet?.map(tp => {
		totalBalance += tp.balance;
		return (
			<div className="row" key={`tpWallet-${tp.tpName}`}>
				<div className="col-3">
					<i className="icon icon-arrow" />
					{tp.tpName}
				</div>
				<div className="col-6">
					{tp.tpUserName}
					<ButtonWithLoading
						onClick={() => {
							copyText(tp.tpUserName);
						}}
						tooltip={`Copy ${tp.tpUserName}`}
						className="btn icon icon-copy"
						variant=""
					/>
				</div>
				<div className="col-3">{number_format(tp.balance)}</div>
			</div>
		);
	});

	return (
		<div className="card">
			<div className="card-body row">
				<div className="col-md-6 gameInformation">
					<h6 className="card-title">Game Information</h6>
					<div className="card">
						<div className="card-body">
							<div className="small">Total Bet</div>
							<div>{number_format(custInfo.effectiveBetSum)}</div>
						</div>
						<div className="enIcon">B</div>
					</div>
					<div className="card">
						<div className="card-body">
							<div className="small">Total Win</div>
							<div>{number_format(custInfo.winnings)}</div>
						</div>
						<div className="enIcon">W</div>
					</div>
					<div className="card">
						<div className="card-body">
							<div className="small">Total Loss</div>
							<div>{number_format(custInfo.losses)}</div>
						</div>
						<div className="enIcon">L</div>
					</div>
					<div className="row">
						<div className="col-md-6">
							<div>Turnover</div>
							<div className="small">
								{number_format(custInfo.turnOver)}
							</div>
						</div>
						<div className="col-md-6">
							<div>Last Bet Date</div>
							<div className="small">
								{datetime_format(custInfo.lastBettingTime)}
							</div>
						</div>
					</div>
				</div>
				<div className="col-md-6 walletInformation">
					<h6 className="card-title">Wallet Information</h6>
					<div className="row">
						<div className="col-3">
							<i className="icon icon-arrow" />
							Main
						</div>
						<div className="col-6">&nbsp;</div>
						<div className="col-3">
							{number_format(custInfo.balance)}
						</div>
					</div>
					{tpWalletRows}
					<div className="row">
						<div className="col-3">&nbsp;</div>
						<div className="col-6">&nbsp;</div>
						<div className="col-3">
							{number_format(totalBalance)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
