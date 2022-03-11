import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const defOptions = {
	csd: [
		{
			displayText: "VIP Log",
			path: "newadmin/member/viplog"
		},
		{
			displayText: "Referral Log",
			path: "newadmin/member/ReferralLog"
		},
		{
			displayText: "Internal Message Log",
			path: "newadmin/member/InternalMessageLog"
		},
		{
			displayText: "External Message Log",
			path: "newadmin/member/ExternalMessageLog"
		},
		{
			displayText: "Login Log",
			path: "newadmin/member/LoginLog"
		},
		{
			displayText: "Member Audit Log",
			path: "newadmin/member/MemberAuditLog"
		}
	],
	finance: [
		{
			displayText: "Deposit Log",
			path: "newadmin/member/DepositLog"
		},
		{
			displayText: "Withdrawal Log",
			path: "newadmin/member/WithdrawalLog"
		},
		{
			displayText: "Adjustment Log",
			path: "newadmin/member/AdjustmentLog"
		},
		{
			displayText: "Fund Transfer Log",
			path: "newadmin/member/FundTransferLog"
		},
		{
			displayText: "Transaction Log",
			path: "newadmin/member/TransactionLog"
		},
		{
			displayText: "Bank Account Log",
			path: "newadmin/member/BankAccountLog"
		},
		{
			displayText: "Crypto Account Log",
			path: "newadmin/member/CryptoAccountLog"
		}
	],
	game: [
		{
			displayText: "Bet Summary",
			path: "newadmin/member/BetSummary"
		},
		{
			displayText: "Bet Detail",
			path: "newadmin/member/BetDetail"
		}
	],
	marketing: [
		{
			displayText: "Rebate Log",
			path: "newadmin/member/RebateLog"
		},
		{
			displayText: "Bonus Wallet",
			path: "newadmin/member/BonusWallet"
		},
		{
			displayText: "Bonus Log",
			path: "newadmin/member/BonusLog"
		},
		{
			displayText: "VIP Rebate Log",
			path: "newadmin/member/VIPRebateLog"
		},
		{
			displayText: "Promotion Log",
			path: "newadmin/member/PromotionLog"
		}
	]
};

const NavBar = () => {
	const { t } = useTranslation();

	return (
		<nav className="navbar navbar-expand-lg bg-dark">
			<div className="container-fluid">
				<a href="">User Name</a>
				<Dropdown
					t={t}
					title="CSD"
					icon="icon icon-admin"
					options={defOptions.csd}
				/>
				<Dropdown
					t={t}
					title="Finance"
					icon="icon icon-finance"
					options={defOptions.finance}
				/>
				<Dropdown
					t={t}
					title="Game"
					icon="icon icon-game"
					options={defOptions.game}
				/>
				<Dropdown
					t={t}
					title="Marketing"
					icon="icon icon-marketing"
					options={defOptions.marketing}
				/>
			</div>
		</nav>
	);
};

const Dropdown = ({ t, options = [], title, icon }) => {
	const ref = useRef(null);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		function handleClickOutside(event) {
			if (ref.current && !ref.current.contains(event.target)) {
				setOpen(false);
			}
		}

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [ref]);

	const rows = options?.map(o => (
		<li key={o.displayText}>
			<Link className="dropdown-item" to={o.path}>
				{o.displayKey ? t(o.displayKey) : o.displayText}
			</Link>
		</li>
	));

	const ClickDropdown = e => {
		e.preventDefault();
		setOpen(prev => !prev);
	};

	return (
		<div className="btn-group" ref={ref}>
			<button
				className={`btn dropdown-toggle${open ? " show" : ""}`}
				data-bs-toggle="dropdown"
				aria-expanded={open}
				onClick={ClickDropdown}>
				<span>
					<i className={icon} />
					<span>{title}</span>
				</span>
			</button>
			<ul className={`dropdown-menu${open ? " show" : ""}`}>{rows}</ul>
		</div>
	);
};

export { NavBar };
