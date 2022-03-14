import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAlert } from "react-alert";
import Layout from "../../components/layout";
import { NavBar } from "../../components/memberDetail/nav";
import { api_customerManage_GetCustInfoDetail } from "../../service/api/customerManage";
import { useGetCurrencyData } from "../../hook";
import Dropdown from "../../components/dropdown";
import { number_format, datetime_format } from "../../components/common";

export default function Page(props) {
	const { t } = useTranslation();
	const alert = useAlert();
	const [custInfo, setCustInfo] = useState();

	useEffect(() => {
		const getCustInfoDetail = async custId => {
			try {
				const res = await api_customerManage_GetCustInfoDetail({
					custId
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

		if (props?.match?.params?.id) {
			getCustInfoDetail(props?.match?.params?.id);
		}
	}, []);

	return (
		<Layout>
			<main className="col-md-9 col-lg-10 customerInformation">
				<h1 className="h2">{t("Member.MemberDetail.Title")}</h1>
				<NavBar />
				<div className="row">
					<div className="col-xl-4">
						{custInfo && <Main custInfo={custInfo} t={t} />}
						{custInfo && <SiginUpInfo custInfo={custInfo} t={t} />}
					</div>
					<div className="col-xl-8">
						{custInfo && <FinanceInfo custInfo={custInfo} t={t} />}
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

const defStats = {
	Running: 1,
	Suspend: 2,
	Closed: 3,
	Lock: 4,
	UnLock: 5
};

const defStatusOptions = [
	{
		value: defStats.Running
	},
	{
		value: defStats.Suspend
	},
	{
		value: defStats.Closed
	},
	{
		value: defStats.Lock
	},
	{
		value: defStats.UnLock
	}
];

const ElgibleWithdrawal = (custInfo = null) => {
	if (!custInfo) return 0;

	const { withdrawalLimit, turnOver, tpWallet, balance } = custInfo;

	let res = balance - withdrawalLimit - turnOver;

	tpWallet?.forEach(tp => {
		res += tp.balance;
	});

	return res < 0 ? 0 : res;
};

const Main = ({ custInfo, t }) => {
	const memberLevel_Options = [
		{ value: 0, displayText: "0" },
		{ value: 1, displayText: "1" },
		{ value: 2, displayText: "2" },
		{ value: 3, displayText: "3" },
		{ value: 4, displayText: "4" },
		{ value: 5, displayText: "5" },
		{ value: 6, displayText: "6" }
	];

	const [memberLevel, setMemberLevel] = useState({
		value: custInfo.userLevel,
		displayText: custInfo.userLevel
	});

	const vipLevel_Options = [
		{ value: 0, displayText: "VINTAGE" },
		{ value: 1, displayText: "SILVER" },
		{ value: 2, displayText: "GOLD" },
		{ value: 3, displayText: "TITANIUM" },
		{ value: 4, displayText: "DIAMOND" },
		{ value: 5, displayText: "NOVA" }
	];

	const [vipLevel, setVIPLevel] = useState({
		value: custInfo.vipLevel,
		displayText: custInfo.vipLevel
	});

	const [status_Options, setStatus_Options] = useState([]);

	const [status, setStatus] = useState(4);

	const { currencyData } = useGetCurrencyData({
		currencyIds: custInfo.currencyId
	});

	const [isKyc, setIsKyc] = useState(custInfo.isKyc);
	const [isRisk, setIsRisk] = useState(custInfo.isRisk);

	useEffect(() => {
		setStatus_Options(() => {
			if (status === defStats.Running) {
				// running: lock/closed
				return [
					{
						value: status,
						displayText: t(`Status.${status}`)
					},
					...defStatusOptions
						.filter(
							s =>
								s.value === defStats.Lock ||
								s.value === defStats.Closed
						)
						.map(s => ({
							value: s.value,
							displayText: t(`Status.${s.value}`)
						}))
				];
			}

			if (status === defStats.Lock || status === defStats.Suspend) {
				// unlock/closed
				return [
					{
						value: status,
						displayText: t(`Status.${status}`)
					},
					...defStatusOptions
						.filter(
							s =>
								s.value === defStats.UnLock ||
								s.value === defStats.Closed
						)
						.map(s => ({
							value: s.value,
							displayText: t(`Status.${s.value}`)
						}))
				];
			}

			return [];
		});
	}, [status]);

	return (
		<div className="card">
			<div className="card-body row">
				<div className="col-xl-4 text-center">
					<div className="avatar icon icon-admin" />
					<h6>{custInfo.userName}</h6>
					<p className="small">{currencyData?.displayText}</p>
					<div className="btn-group">
						{status === defStats.Closed ? (
							t(`Status.${defStats.Closed}`)
						) : (
							<Dropdown
								value={status}
								options={status_Options}
								onSelect={() => {}}
							/>
						)}
					</div>
				</div>
				<div className="col-xl-8">
					<div className="row">
						<div className="col-6">
							<Dropdown
								title="VIP Level"
								value={vipLevel}
								options={vipLevel_Options}
								onSelect={() => {}}
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
									onChange={() => setIsKyc(prev => !prev)}
								/>
							</div>
						</div>
						<div className="col-6">
							<Dropdown
								title="Member Level"
								value={memberLevel}
								options={memberLevel_Options}
								onSelect={() => {}}
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
									onChange={() => setIsRisk(prev => !prev)}
								/>
							</div>
						</div>
					</div>
					<h6>Tag</h6>
					<div className="btn-group">
						<input
							className="btn btn-outline-secondary dropdown-toggle"
							placeholder="Select Some Options"
							data-bs-toggle="dropdown"
						/>
						<ul className="dropdown-menu">
							<li>
								<a className="dropdown-item" href="#">
									All
								</a>
							</li>
							<li>
								<a className="dropdown-item" href="#">
									Nova88
								</a>
							</li>
							<li>
								<a className="dropdown-item" href="#">
									Goal123
								</a>
							</li>
							<li>
								<a className="dropdown-item" href="#">
									Bwing
								</a>
							</li>
							<li>
								<a className="dropdown-item" href="#">
									Soon88
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div className="card-footer">
				<button className="btn icon icon-edit" />
				<button className="btn icon icon-reset" />
				<button className="btn icon icon-password" />
				<button className="btn icon icon-out" />
				<button className="btn icon icon-basket" />
			</div>
		</div>
	);
};

const SiginUpInfo = ({ custInfo }) => {
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
								onChange={() => setPhoneVerified(prev => !prev)}
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
								onChange={() => setEmailVerified(prev => !prev)}
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

const FinanceInfo = ({ custInfo, t }) => (
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
							<div>{number_format(custInfo.withdrawlSum)}</div>
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
			<button className="btn icon icon-finance" />
			<button className="btn icon icon-eth" />
		</div>
	</div>
);

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
					<i
						className="icon icon-copy"
						onClick={() => {
							copyText(tp.tpUserName);
						}}
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
